import { shallowMount } from '@vue/test-utils'
import Book from '@/components/library/Book'

describe('Book', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(Book, {
            propsData: {
                src: 'path/to/book.pdf'
            },
            mocks: {
                $router: {
                    push: jest.fn()
                }
            }
        })
    })

    it('shows book thumbnail image when it is a pdf file', () => {
        const thumbnail = wrapper.find('img.book__thumbnail')

        expect(thumbnail.exists()).toBe(true)
        expect(thumbnail.attributes('src')).toBe('path/to/book.jpg')
    })

    it('shows default cover when it is a epub file', () => {
        wrapper.setProps({
            src: 'path/to/book.epub'
        })

        const thumbnail = wrapper.find('.book__thumbnail')

        expect(thumbnail.exists()).toBe(true)
        setTimeout(() => expect(thumbnail.attributes('src')).toEqual('book_cover'))
    })

    it('shows an error when "src" prop is not provided', () => {
        console.error = jest.fn()
        
        shallowMount(Book)

        expect(console.error).toHaveBeenCalledWith(expect.stringMatching('Missing required prop: "src"'))
    })

    it('should navigate to /reader with proper prop on click', () => {
        wrapper.trigger('click')

        expect(wrapper.vm.$router.push.mock.calls[0][0].name).toEqual('reader')
        expect(wrapper.vm.$router.push.mock.calls[0][0].params.src).toEqual(wrapper.props('src'))
    })
})