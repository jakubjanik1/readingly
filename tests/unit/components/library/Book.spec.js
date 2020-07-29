import { mount, createLocalVue } from '@vue/test-utils'
import Book from '@/components/library/Book'
import Vuex from 'vuex'
import library from '@/store/modules/library'

jest.mock('@/store/modules/library')

const localVue = createLocalVue()
localVue.use(Vuex)

describe('<Book />', () => {
    const STORAGE_URL = 'https://firebasestorage.googleapis.com/v0/b/readingly-ab5f7.appspot.com/o/@?alt=media'
    const DEFAULT_BOOK_COVER = STORAGE_URL.replace('@', 'default_cover.png')

    it('shows book thumbnail', async () => {
        const wrapper = mountBook({ src: 'o/path/to/book.epub?' })
        await wrapper.vm.$nextTick()

        const thumbnail = wrapper.find('img.book__thumbnail')

        expect(thumbnail.exists()).toBe(true)
        expect(thumbnail.attributes('src')).toBe('o/path/to/book.jpg?')
    })

    it('shows default thumbnail when image is not available', async () => {
        const wrapper = mountBook({ src: 'o/path/to/book.epub?' })
        
        const thumbnail = wrapper.find('img.book__thumbnail')
        thumbnail.element.dispatchEvent(new Event('error'))

        expect(thumbnail.exists()).toBe(true)
        expect(thumbnail.attributes('src')).toEqual(DEFAULT_BOOK_COVER)
    })

    it('should navigate to /reader with proper prop on click', () => {
        const wrapper = mountBook({ src: STORAGE_URL.replace('@', 'book.epub') })
        const thumbnail = wrapper.find('.book__thumbnail')

        thumbnail.trigger('click')

        expect(wrapper.vm.$router.push.mock.calls[0][0].name).toEqual('reader')
        expect(wrapper.vm.$router.push.mock.calls[0][0].params.book).toEqual('book.epub')
    })

    it('hides remove icon by default', () => {
        const wrapper = mountBook({ src: 'o/path/to/book.epub?' })
        const removeIcon = wrapper.find('.book__remove')

        expect(removeIcon.exists()).toBe(false)
    })

    it('shows remove icon when removable prop is true', () => {
        const wrapper = mountBook({ src: 'o/path/to/book.epub?', removable: true })
        const removeIcon = wrapper.find('.book__remove')

        expect(removeIcon.exists()).toBe(true)
    })

    it('calls removeBook action when remove icon is clicked', () => {
        const wrapper = mountBook({ src: 'o/path/to/book.epub?', removable: true })
        const removeIcon = wrapper.find('.book__remove')
        
        removeIcon.trigger('click')

        expect(library.actions.removeBook).toHaveBeenCalled()
        expect(library.actions.removeBook.mock.calls[0][1]).toEqual('path/to/book.epub')
    })

    function mountBook(props) {
        return mount(Book, {
            propsData: props,
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