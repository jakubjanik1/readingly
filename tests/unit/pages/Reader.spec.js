import { shallowMount } from '@vue/test-utils'
import Reader from '@/pages/Reader'

describe('Reader', () => {
    it('shows EpubViewer if book is in epub format', async () => {
        const wrapper = mountReader('book.epub')

        await wrapper.vm.$nextTick()
        const epubViewer = wrapper.find({ name: 'EpubViewer' })

        expect(epubViewer.exists()).toBe(true)
        expect(epubViewer.props('src')).toBe(process.env.VUE_APP_FIREBASE_STORAGE_URL.replace('@', 'book.epub'))
    })

    it('shows PdfViewer if book is in pdf format', async () => {
        const wrapper = mountReader('book.pdf')

        await wrapper.vm.$nextTick()
        const pdfViewer = wrapper.find({ name: 'PdfViewer' })

        expect(pdfViewer.exists()).toBe(true)
        expect(pdfViewer.props('src')).toBe(process.env.VUE_APP_FIREBASE_STORAGE_URL.replace('@', 'book.pdf'))
    })

    it('shows Dictionary when EpubViewer emits "text-select" event', () => {
        const wrapper = mountReader('book.epub')
        const dictionary = wrapper.find({ name: 'Dictionary' })

        expect(dictionary.isVisible()).toBe(false)

        wrapper.find({ name: 'EpubViewer' }).trigger('text-select', 'mutter')

        expect(dictionary.isVisible()).toBe(true)
    })

    function mountReader(book) {
        return shallowMount(Reader, {
            mocks: {
                $route: {
                    params: { book }
                }
            }
        })
    }
})