import { shallowMount } from '@vue/test-utils'
import Reader from '@/pages/Reader'

describe('Reader', () => {
    it('shows EpubViewer with correct prop', async () => {
        const wrapper = mountReader('book.epub')

        await wrapper.vm.$nextTick()
        const epubViewer = wrapper.find({ name: 'EpubViewer' })

        expect(epubViewer.exists()).toBe(true)
        expect(epubViewer.props('src')).toBe(process.env.VUE_APP_FIREBASE_STORAGE_URL.replace('@', 'book.epub'))
    })

    it('shows Dictionary when EpubViewer emits "text-select" event', async () => {
        const wrapper = mountReader('book.epub')
        const dictionary = wrapper.find({ name: 'Dictionary' })

        expect(dictionary.props('word')).toBe('')

        wrapper.find({ name: 'EpubViewer' }).vm.$emit('text-select', 'mutter')

        expect(wrapper.vm.$modal.show).toHaveBeenCalledWith('dictionary')
        expect(dictionary.props('word')).toBe('mutter')
    })

    function mountReader(book) {
        return shallowMount(Reader, {
            mocks: {
                $route: {
                    params: { book }
                },
                $modal: {
                    show: jest.fn()
                }
            }
        })
    }
})