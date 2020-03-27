import { shallowMount, createLocalVue } from '@vue/test-utils'
import ReadingProgress from '@/components/reader/ReadingProgress'
import Vuex from 'vuex'
import reader from '@/store/modules/reader'

jest.mock('@/store/modules/reader')

const localVue = createLocalVue()
localVue.use(Vuex)

describe('<ReadingProgress />', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(ReadingProgress, {
            localVue,
            store: new Vuex.Store({
                modules: {
                    reader
                }
            })
        })
    })

    it('changes progress when reader state changes', () => {
        reader.state.progress = 25

        expect(wrapper.element.style.width).toBe('25%')
    })

    it('sets default progress from store', () => {
        expect(wrapper.element.style.width).toBe(reader.state.progress + '%')
    })
})