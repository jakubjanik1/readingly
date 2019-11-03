import Library from '@/components/Library.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import AddBook from '@/components/AddBook'
import library from '@/store/modules/library'

jest.mock('@/store/modules/library')

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

    it('renders main child component', () => {
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
})