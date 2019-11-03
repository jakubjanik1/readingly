import { storage } from '@/firebase'

export async function uploadFile(file) {
    if (! (file instanceof Blob)) {
        throw new Error('Incorrect parameter')   
    }

    const snapshot = await storage.child(file.name).put(file)

    return snapshot.ref.getDownloadURL()
}