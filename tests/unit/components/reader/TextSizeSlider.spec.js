import { shallowMount, createLocalVue } from '@vue/test-utils'
import TextSizeSlider from '@/components/reader/TextSizeSlider'
import Slider from 'vue-slider-component'
import Vuex from 'vuex'
import reader from '@/store/modules/reader'

jest.mock('@/store/modules/reader')
reader.state = {
    textSize: 115
}

const localVue = createLocalVue()
localVue.use(Vuex)

describe('TextSizeSlider', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(TextSizeSlider, {
            localVue,
            store: new Vuex.Store({
                modules: {
                    reader
                }
            })
        }) 
    })

    it('sets Slider default value from store', () => {
        const slider = wrapper.find(Slider)

        expect(slider.props('value')).toEqual(reader.state.textSize)
    })

    it('calls setTextSize mutation when Slider changes value', () => {
        const slider = wrapper.find(Slider)
        const NEW_TEXT_SIZE = 125

        slider.vm.$emit('change', NEW_TEXT_SIZE)

        expect(reader.mutations.setTextSize).toHaveBeenCalled()
        expect(reader.mutations.setTextSize.mock.calls[0][1]).toEqual(NEW_TEXT_SIZE)
    })
})