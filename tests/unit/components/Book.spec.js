import { shallowMount } from '@vue/test-utils'
import Book from '@/components/Book'

describe('Book', () => {
    it('contains book thumbnail image with "src" prop', () => {
        const wrapper = shallowMount(Book, {
            propsData: {
                src: 'path/to/thumbnail'
            }
        })  

        const thumbnailImg = wrapper.find('img.book__thumbnail')

        expect(thumbnailImg.exists()).toBe(true)
        expect(thumbnailImg.attributes('src')).toBe('path/to/thumbnail')
    })

    it('shows an error when "src" prop is not provided', () => {
        console.error = jest.fn()
        
        shallowMount(Book)

        expect(console.error).toHaveBeenCalledWith(expect.stringMatching('Missing required prop: "src"'))
    })
})