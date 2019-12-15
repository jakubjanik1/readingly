import { shallowMount } from '@vue/test-utils'
import Reader from '@/pages/Reader'

describe('Reader', () => {
    it('shows EpubViewer if book is in epub format', () => {
        const wrapper = shallowMount(Reader, {
            propsData: {
                src: 'https://example.com/path/to/book.epub'
            }
        })

        const epubViewer = wrapper.find({ name: 'EpubViewer' })

        expect(epubViewer.exists()).toBe(true)
        expect(epubViewer.props('src')).toBe(wrapper.props('src'))
    })

    it('shows PdfViewer if book is in pdf format', () => {
        const wrapper = shallowMount(Reader, {
            propsData: {
                src: 'https://example.com/path/to/book.pdf'
            }
        })

        const pdfViewer = wrapper.find({ name: 'PdfViewer' })

        expect(pdfViewer.exists()).toBe(true)
        expect(pdfViewer.props('src')).toBe(wrapper.props('src'))
    })
})