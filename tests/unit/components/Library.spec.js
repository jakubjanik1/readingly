import Library from '@/components/Library.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import AddBook from '@/components/AddBook'
import Book from '@/components/Book'
import library from '@/store/modules/library'

jest.mock('@/store/modules/library')
library.state =  {
    books: [
        'path/to/book1',
        'path/to/book2',
        'path/to/book3'
    ]
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
        const addBook = wrapper.find(AddBook)

        expect(addBook.exists()).toBe(true)
    })

    it('call addBook action when received "change" from AddBook', () => {
        const addBook = wrapper.find(AddBook)

        const file = new File([], 'book.pdf', { type: 'application/pdf' })

        addBook.vm.$emit('change', file)

        expect(library.actions.addBook).toHaveBeenCalled()
        expect(library.actions.addBook.mock.calls[0][1]).toEqual(file)
    })

    it('renders all available books when component is created', () => {
        const books = wrapper.findAll(Book)

        expect(library.actions.getBooks).toHaveBeenCalled()
        expect(books).toHaveLength(library.state.books.length)
    })
})