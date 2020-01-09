import Library from '@/pages/Library.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import library from '@/store/modules/library'

jest.mock('@/store/modules/library')
library.state =  {
    books: [
        'path/to/book1',
        'path/to/book2',
        'path/to/book3'
    ],
    bookIsUploading: false
}

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Library', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(Library, {
            localVue,
            store: new Vuex.Store({
                modules: {
                    library
                }
            })
        }) 
    })

    it('renders AddBook component', () => {
        const addBook = wrapper.find({ name: 'AddBook' })

        expect(addBook.exists()).toBe(true)
    })

    it('call addBook action when received "change" from AddBook', () => {
        const addBook = wrapper.find({ name: 'AddBook' })

        const file = new File([], 'book.epub', { type: 'application/epub+zip' })

        addBook.vm.$emit('change', file)

        expect(library.actions.addBook).toHaveBeenCalled()
        expect(library.actions.addBook.mock.calls[0][1]).toEqual(file)
    })

    it('renders all available books when component is created', () => {
        const books = wrapper.findAll({ name: 'Book' })

        expect(library.actions.getBooks).toHaveBeenCalled()
        expect(books).toHaveLength(library.state.books.length)
    })

    it('hides BookUploading component by default', () => {
        const bookUploading = wrapper.find({ name: 'BookUploading' })

        expect(bookUploading.exists()).toBe(false)
    })

    it('shows BookUploading component when book is uploading', () => {
        library.state.bookIsUploading = true

        const bookUploading = wrapper.find({ name: 'BookUploading' })

        expect(bookUploading.exists()).toBe(true)
    })

})