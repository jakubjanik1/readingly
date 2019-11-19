const { https } = require('firebase-functions')
const os = require('os')
const gs = require('gs')
const path = require('path')
const fs = require('fs')
const spawn = require('child-process-promise').spawn
const admin = require('firebase-admin')
admin.initializeApp()

exports.createThumbnail = https.onRequest((req, res) => {
    const filePath = /o\/(.*)\?/.exec(req.body.file)[1].replace('%2F', '/')
    const fileDir = path.dirname(filePath)
    const fileName = path.basename(filePath)
    const tempFilePath = path.join(os.tmpdir(), fileName)

    const newName = path.basename(filePath, '.pdf') + '.jpg'
    const tempNewPath = path.join(os.tmpdir(), newName)

    const bucket = admin.storage().bucket()

    return bucket.file(filePath).download({
        destination: tempFilePath
    }).then(() => {
        return new Promise((resolve, reject) => {
            gs()
                .batch()
                .nopause()
                .option('-dFirstPage=1')
                .option('-dLastPage=1')
                .executablePath('lambda-ghostscript/bin/./gs')
                .device('jpeg')
                .output(tempNewPath)
                .input(tempFilePath)
                .exec((err) => {
                    if (! err) {
                        resolve()
                    } else {
                        reject(err)
                    }
                })
        })
    }).then(async () => {
        await bucket.upload(tempNewPath, { destination: newName })

        return res.send(`https://firebasestorage.googleapis.com/v0/b/readingly-ab5f7.appspot.com/o/${ newName }?alt=media`)
    }).then(() => {
        fs.unlinkSync(tempNewPath)
        fs.unlinkSync(tempFilePath)
    })
})