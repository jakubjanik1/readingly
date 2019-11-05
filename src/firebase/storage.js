import { storage } from '@/firebase'

export async function uploadFile(file, folder = '') {
    if (! (file instanceof Blob)) {
        throw new Error('Incorrect parameter')   
    }

    const snapshot = await storage.child(`${ folder }/${ file.name }`).put(file)

    return snapshot.ref.getDownloadURL()
}

export async function getFiles(folder = '') {
    const { items } = await storage.child(folder).listAll()

    return Promise.all(items.map(file => file.getDownloadURL()))
}