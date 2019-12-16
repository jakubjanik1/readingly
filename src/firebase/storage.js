import { storage } from '@/firebase'
import { uuid } from 'uuidv4'

export async function uploadFile(file, options = {}) {
    if (! (file instanceof Blob)) {
        throw new Error('Incorrect parameter')   
    }
  
    const extension = file.name ? file.name.split('.').pop() : options.ext
    const snapshot = await storage.child((options.name || uuid())  + '.' + extension).put(file)

    return snapshot.ref.getDownloadURL()
}

export async function getFiles(pattern) {
    let { items } = await storage.child('').listAll()

    items = items.filter(({name}) => name.match(pattern))
    
    items = await Promise.all(
        items.map(async file => ({ 
            date: (await file.getMetadata()).timeCreated, 
            url: await file.getDownloadURL() 
        })
    ))

    items.sort((a, b) => new Date(b.date) - new Date(a.date))

    return items.map(file => file.url)
}