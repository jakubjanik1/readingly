import { uploadFile, getFiles, deleteFile } from '../../../src/firebase/storage'
import { storage } from '../../../src/firebase'
import { isUuid } from 'uuidv4'

storage.child = jest.fn(path => storage)
storage.put = jest.fn(file => Promise.resolve({ 
    ref: {
        getDownloadURL: jest.fn(() => Promise.resolve('path/to/file.epub'))
    }
}))

storage.listAll = jest.fn(() => Promise.resolve({
    items: [{ 
            name: 'file1.epub', 
            getDownloadURL: () => Promise.resolve('path/to/file1.epub'), 
            getMetadata: () => Promise.resolve({ timeCreated: new Date() - 60 })
        }, { 
            name: 'file2.jpg', 
            getDownloadURL: () => Promise.resolve('path/to/file2.jpg'),
            getMetadata: () => Promise.resolve({ timeCreated: new Date() })
        }, { 
            name: 'file3.jpg', 
            getDownloadURL: () => Promise.resolve('path/to/file3.jpg'),
            getMetadata: () => Promise.resolve({ timeCreated: new Date() - 120 })
        }
    ]
}))

storage.delete = jest.fn(() => Promise.resolve())

describe('Firebase Storage', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('uploadFile', () => {
        it('should works when file is passed', async () => {
            const file = new File([], 'book.epub', { type: 'application/epub+zip' })

            const path = await uploadFile(file)

            expect(isUuid(storage.child.mock.calls[0][0].replace('.epub', ''))).toBe(true)
            expect(storage.put).toHaveBeenCalledWith(file)
            expect(path).toEqual('path/to/file.epub')
        })

        it('should throws an error when not file is passed', async () => {
            const file = { name: 'wrong_parameter' }

            await expect(uploadFile(file)).rejects.toThrowError('Incorrect parameter')
        })
    })

    describe('getFiles', () => {
        it('gets all files from storage sorted in descending order by created date', async () => {
            const files = await getFiles()

            expect(storage.child).toHaveBeenCalled()
            expect(storage.listAll).toHaveBeenCalled()
            expect(files).toEqual(['path/to/file2.jpg', 'path/to/file1.epub', 'path/to/file3.jpg'])
        })

        it('gets all files matching the pattern', async () => {
            const files = await getFiles(/.*\.jpg/)

            expect(storage.child).toHaveBeenCalled()
            expect(storage.listAll).toHaveBeenCalled()
            expect(files).toEqual(['path/to/file2.jpg', 'path/to/file3.jpg'])
        })
    })

    describe('deleteFile', () => {
          it('should works when file is passed', async () => {
              await deleteFile('book.epub')

              expect(storage.child.mock.calls[0][0]).toBe('book.epub')
              expect(storage.delete).toHaveBeenCalled()
          })
    })
})