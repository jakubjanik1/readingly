import { storage } from '@/firebase'

export async function uploadFile(file) {
    if (! (file instanceof Blob)) {
        throw new Error('Incorrect parameter')   
    }

    const snapshot = await storage.child(file.name).put(file)

    return snapshot.ref.getDownloadURL()
}

export async function getFiles(pattern) {
    let { items } = await storage.child('').listAll()

    items = items.filter(({name}) => name.match(pattern))

    return Promise.all(items.map(file => file.getDownloadURL()))
}