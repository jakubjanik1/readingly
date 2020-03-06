import { mount, createLocalVue } from '@vue/test-utils'
import Book from '@/components/library/Book'
import Vuex from 'vuex'
import library from '@/store/modules/library'

jest.mock('@/store/modules/library')

const localVue = createLocalVue()
localVue.use(Vuex)

describe('<Book />', () => {
    it('shows book thumbnail', async () => {
        const wrapper = mountBook('o/path/to/book.epub?')
        await wrapper.vm.$nextTick()

        const thumbnail = wrapper.find('img.book__thumbnail')

        expect(thumbnail.exists()).toBe(true)
        expect(thumbnail.attributes('src')).toBe('o/path/to/book.jpg?')
    })

    it('shows default thumbnail when image is not available', async () => {
        const wrapper = mountBook('o/path/to/book.epub?')
        
        const thumbnail = wrapper.find('img.book__thumbnail')
        thumbnail.element.dispatchEvent(new Event('error'))

        expect(thumbnail.exists()).toBe(true)
        expect(thumbnail.attributes('src')).toEqual(process.env.VUE_APP_DEFAULT_BOOK_COVER)
    })

    it('should navigate to /reader with proper prop on click', () => {
        const wrapper = mountBook(process.env.VUE_APP_FIREBASE_STORAGE_URL.replace('@', 'book.epub'))
        const thumbnail = wrapper.find('.book__thumbnail')

        thumbnail.trigger('click')

        expect(wrapper.vm.$router.push.mock.calls[0][0].name).toEqual('reader')
        expect(wrapper.vm.$router.push.mock.calls[0][0].params.book).toEqual('book.epub')
    })

    it('calls removeBook action when remove icon is clicked', () => {
        const wrapper = mountBook('o/path/to/book.epub?')
        const removeIcon = wrapper.find('.book__remove')
        
        removeIcon.trigger('click')

        expect(library.actions.removeBook).toHaveBeenCalled()
        expect(library.actions.removeBook.mock.calls[0][1]).toEqual('path/to/book.epub')
    })

    function mountBook(src) {
        return mount(Book, {
            propsData: { src },
            mocks: {
                $router: {
                    push: jest.fn()
                }
            },
            localVue,
            store: new Vuex.Store({
                modules: {
                    library
                }
            })
        })
    }
})