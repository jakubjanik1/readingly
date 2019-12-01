import { shallowMount } from '@vue/test-utils'
import Book from '@/components/library/Book'

describe('Book', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(Book, {
            propsData: {
                src: 'path/to/thumbnail'
            },
            mocks: {
                $router: {
                    push: jest.fn()
                }
            }
        })
    })

    it('contains book thumbnail image with "src" prop', () => {
        const thumbnailImg = wrapper.find('img.book__thumbnail')

        expect(thumbnailImg.exists()).toBe(true)
        expect(thumbnailImg.attributes('src')).toBe('path/to/thumbnail')
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