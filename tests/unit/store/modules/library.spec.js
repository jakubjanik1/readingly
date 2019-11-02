import library from '@/store/modules/library'
import { uploadFile } from '@/firebase/storage'

jest.mock('@/firebase/storage', () => ({
    uploadFile: jest.fn(() => Promise.resolve('path/to/book'))
}))

describe('Store - library', () => {
    describe('mutations', () => {
        let state

        beforeEach(() => {
            state = library.state
        })

        it('pushBook pushes new book', () => {
            const book = 'path/to/book'

            library.mutations.pushBook(state, book)

            expect(state.books).toHaveLength(1)
            expect(state.books).toContain(book)
        })
    })

    describe('actions', () => {
        let commit

        beforeEach(() => {
            commit = jest.fn()
        })

        it('addBook uploads and pushes book', async () => {
            const book = new File([], 'book.pdf', { type: 'application/pdf' })

            await library.actions.addBook({ commit }, book)

            expect(uploadFile).toHaveBeenCalledWith(book)
            expect(commit).toHaveBeenCalledWith('pushBook', 'path/to/book')
        })
    })
})
