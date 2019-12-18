import { shallowMount } from '@vue/test-utils'
import Book from '@/components/library/Book'

describe('Book', () => {
    it('shows book thumbnail image when it is a epub file', async () => {
        const wrapper = mountBook('path/to/book.epub')
        await wrapper.vm.$nextTick()

        const thumbnail = wrapper.find('img.book__thumbnail')

        expect(thumbnail.exists()).toBe(true)
        expect(thumbnail.attributes('src')).toBe('path/to/book.jpg')
    })

    it('shows book thumbnail image when it is a pdf file', async () => {
        const wrapper = mountBook('path/to/book.pdf')
        await wrapper.vm.$nextTick()

        const thumbnail = wrapper.find('img.book__thumbnail')

        expect(thumbnail.exists()).toBe(true)
        expect(thumbnail.attributes('src')).toBe('path/to/book.jpg')
    })

    it('shows default thumbnail when image is not available', async () => {
        const wrapper = mountBook('path/to/book.epub')
        
        const thumbnail = wrapper.find('img.book__thumbnail')
        thumbnail.element.dispatchEvent(new Event('error'))

        expect(thumbnail.exists()).toBe(true)
        expect(thumbnail.attributes('src')).toEqual(process.env.VUE_APP_DEFAULT_BOOK_COVER)
    })

    it('shows an error when "src" prop is not provided', () => {
        console.error = jest.fn()
        
        shallowMount(Book)

        expect(console.error).toHaveBeenCalledWith(expect.stringMatching('Missing required prop: "src"'))
    })

    it('should navigate to /reader with proper prop on click', () => {
        const wrapper = mountBook(process.env.VUE_APP_FIREBASE_STORAGE_URL.replace('@', 'book.epub'))
        wrapper.trigger('click')

        expect(wrapper.vm.$router.push.mock.calls[0][0].name).toEqual('reader')
        expect(wrapper.vm.$router.push.mock.calls[0][0].params.book).toEqual('book.epub')
    })

    function mountBook(src) {
        return shallowMount(Book, {
            propsData: { src },
            mocks: {
                $router: {
                    push: jest.fn()
                }
            }
        })
    }
})