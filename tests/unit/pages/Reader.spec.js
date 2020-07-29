import { shallowMount, createLocalVue } from '@vue/test-utils'
import Reader from '@/pages/Reader'
import VueSlideoutPanel from 'vue2-slideout-panel'
import Vuex from 'vuex'
import reader from '@/store/modules/reader'

jest.mock('@/store/modules/reader')

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueSlideoutPanel)

const STORAGE_URL = 'https://firebasestorage.googleapis.com/v0/b/readingly-ab5f7.appspot.com/o/@?alt=media'

describe('<Reader />', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(Reader, {
            localVue,
            store: new Vuex.Store({
                modules: {
                    reader
                }
            }),
            mocks: {
                $route: {
                    params: { book: 'book.epub' }
                },
                $showPanel: jest.fn()
            }
        })
    })

    it('shows EpubViewer with correct prop', async () => {
        await wrapper.vm.$nextTick()
        const epubViewer = wrapper.find({ name: 'EpubViewer' })

        expect(epubViewer.exists()).toBe(true)
        expect(epubViewer.props('src')).toBe(STORAGE_URL.replace('@', 'book.epub'))
    })

    it('opens Dictionary when EpubViewer emits "text-select" event', async () => {
        wrapper.find({ name: 'EpubViewer' }).vm.$emit('text-select', 'mutter')

        expect(wrapper.vm.$showPanel).toHaveBeenCalledWith(
            expect.objectContaining({
                component: 'Dictionary',
                props: { word: 'mutter' } 
            })
        )
    })

    it('opens Settings when OpenSettings component is clicked', () => {
        wrapper.find({ name: 'OpenSettings' }).vm.$emit('click')

        expect(wrapper.vm.$showPanel).toHaveBeenCalledWith(
            expect.objectContaining({
                component: 'Settings'
            })
        )
    })

    it('changes brightness when reader state changes', () => {
        expect(wrapper.attributes('brightness')).toContain(reader.state.brightness)

        reader.state.brightness = 50

        expect(wrapper.attributes('brightness')).toContain(50)
    })

    it('shows ReadingProgress', () => {
        const readingProgress = wrapper.find({ name: 'ReadingProgress' })

        expect(readingProgress.exists()).toBe(true)
    })
})