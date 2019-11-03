import { uploadFile } from '../../../src/firebase/storage'
import { storage } from '../../../src/firebase'

storage.child = jest.fn(path => storage)
storage.put = jest.fn(file => Promise.resolve({ 
    ref: {
        getDownloadURL: jest.fn(() => Promise.resolve('path/to/file'))
    }
}))

describe('Firebase Storage', () => {
    describe('uploadFile', () => {
        it('should works when file is passed', async () => {
            const file = new File([], 'book.pdf', { type: 'application/pdf' })

            const path = await uploadFile(file)

            expect(storage.child).toHaveBeenCalledWith(file.name)
            expect(storage.put).toHaveBeenCalledWith(file)
            expect(path).toEqual('path/to/file')
        })

        it('should throws an error when not file is passed', async () => {
            const file = { name: 'wrong_parameter' }

            await expect(uploadFile(file)).rejects.toThrowError('Incorrect parameter')
        })
    })
})