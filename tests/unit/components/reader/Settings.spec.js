import { shallowMount, createLocalVue } from '@vue/test-utils'
import Settings from '@/components/reader/Settings'
import TextSizeSlider from 'vue-range-slider'
import Vuex from 'vuex'
import reader from '@/store/modules/reader'

jest.mock('@/store/modules/reader')
reader.state = {
    textSize: 115
}

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Settings', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(Settings, {
            localVue,
            store: new Vuex.Store({
                modules: {
                    reader
                }
            })
        }) 
    })

    it('sets TextSizeSlider default value from store', () => {
        const textSizeSlider = wrapper.find(TextSizeSlider)

        expect(textSizeSlider.props('value')).toEqual(reader.state.textSize)
    })

    it('calls setTextSize mutation when TextSizeSlider changes value', () => {
        const textSizeSlider = wrapper.find(TextSizeSlider)
        const NEW_TEXT_SIZE = 125

        textSizeSlider.vm.$emit('change', NEW_TEXT_SIZE)

        expect(reader.mutations.setTextSize).toHaveBeenCalled()
        expect(reader.mutations.setTextSize.mock.calls[0][1]).toEqual(NEW_TEXT_SIZE)
    })
})