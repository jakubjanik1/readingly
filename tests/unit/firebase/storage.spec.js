import { uploadFile, getFiles } from '../../../src/firebase/storage'
import { storage } from '../../../src/firebase'

storage.child = jest.fn(path => storage)
storage.put = jest.fn(file => Promise.resolve({ 
    ref: {
        getDownloadURL: jest.fn(() => Promise.resolve('path/to/file.pdf'))
    }
}))

storage.listAll = jest.fn(() => Promise.resolve({
    items: [
        { name: 'file1.pdf', getDownloadURL: jest.fn(() => Promise.resolve('path/to/file1.pdf')) },
        { name: 'file2.jpg', getDownloadURL: jest.fn(() => Promise.resolve('path/to/file2.jpg')) },
        { name: 'file3.jpg', getDownloadURL: jest.fn(() => Promise.resolve('path/to/file3.jpg')) }
    ]
}))

describe('Firebase Storage', () => {
    describe('uploadFile', () => {
        it('should works when file is passed', async () => {
            const file = new File([], 'book.pdf', { type: 'application/pdf' })

            const path = await uploadFile(file)

            expect(storage.child).toHaveBeenCalledWith(file.name)
            expect(storage.put).toHaveBeenCalledWith(file)
            expect(path).toEqual('path/to/file.pdf')
        })

        it('should throws an error when not file is passed', async () => {
            const file = { name: 'wrong_parameter' }

            await expect(uploadFile(file)).rejects.toThrowError('Incorrect parameter')
        })
    })

    describe('getFiles', () => {
        it('gets all files from storage', async () => {
            const files = await getFiles()

            expect(storage.child).toHaveBeenCalled()
            expect(storage.listAll).toHaveBeenCalled()
            expect(files).toEqual(['path/to/file1.pdf', 'path/to/file2.jpg', 'path/to/file3.jpg'])
        })

        it('gets all files matching the pattern', async () => {
            const files = await getFiles(/.*\.jpg/)

            expect(storage.child).toHaveBeenCalled()
            expect(storage.listAll).toHaveBeenCalled()
            expect(files).toEqual(['path/to/file2.jpg', 'path/to/file3.jpg'])
        })
    })
})