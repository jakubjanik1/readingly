import { shallowMount } from '@vue/test-utils'
import Reader from '@/pages/Reader'
import Vue from 'vue'
import VueSlideoutPanel from 'vue2-slideout-panel'
 
Vue.use(VueSlideoutPanel)

describe('Reader', () => {
    it('shows EpubViewer with correct prop', async () => {
        const wrapper = mountReader('book.epub')

        await wrapper.vm.$nextTick()
        const epubViewer = wrapper.find({ name: 'EpubViewer' })

        expect(epubViewer.exists()).toBe(true)
        expect(epubViewer.props('src')).toBe(process.env.VUE_APP_FIREBASE_STORAGE_URL.replace('@', 'book.epub'))
    })

    it('opens Dictionary when EpubViewer emits "text-select" event', async () => {
        const wrapper = mountReader('book.epub')

        wrapper.find({ name: 'EpubViewer' }).vm.$emit('text-select', 'mutter')

        expect(wrapper.vm.$showPanel).toHaveBeenCalledWith(
            expect.objectContaining({
                component: 'Dictionary',
                props: { word: 'mutter' } 
            })
        )
    })

    it('opens Settings when OpenSettings component is clicked', () => {
        const wrapper = mountReader('book.epub')

        wrapper.find({ name: 'OpenSettings' }).vm.$emit('click')

        expect(wrapper.vm.$showPanel).toHaveBeenCalledWith(
            expect.objectContaining({
                component: 'Settings'
            })
        )
    })

    function mountReader(book) {
        return shallowMount(Reader, {
            mocks: {
                $route: {
                    params: { book }
                },
                $showPanel: jest.fn()
            }
        })
    }
})