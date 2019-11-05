import { uploadFile, getFiles } from '../../../src/firebase/storage'
import { storage } from '../../../src/firebase'

storage.child = jest.fn(path => storage)
storage.put = jest.fn(file => Promise.resolve({ 
    ref: {
        getDownloadURL: jest.fn(() => Promise.resolve('path/to/file'))
    }
}))

storage.listAll = jest.fn(() => Promise.resolve({
    items: [
        { getDownloadURL: jest.fn(() => Promise.resolve('path/to/file1')) },
        { getDownloadURL: jest.fn(() => Promise.resolve('path/to/file2')) },
        { getDownloadURL: jest.fn(() => Promise.resolve('path/to/file3')) }
    ]
}))

describe('Firebase Storage', () => {
    describe('uploadFile', () => {
        it('should works when file is passed', async () => {
            const file = new File([], 'book.pdf', { type: 'application/pdf' })

            const path = await uploadFile(file, 'files')

            expect(storage.child).toHaveBeenCalledWith(`files/${ file.name }`)
            expect(storage.put).toHaveBeenCalledWith(file)
            expect(path).toEqual('path/to/file')
        })

        it('should throws an error when not file is passed', async () => {
            const file = { name: 'wrong_parameter' }

            await expect(uploadFile(file)).rejects.toThrowError('Incorrect parameter')
        })
    })

    describe('getFiles', () => {
        it('gets all files from storage', async () => {
            const files = await getFiles('files')

            expect(storage.child).toHaveBeenCalledWith('files')
            expect(storage.listAll).toHaveBeenCalled()
            expect(files).toEqual(['path/to/file1', 'path/to/file2', 'path/to/file3'])
        })
    })
})