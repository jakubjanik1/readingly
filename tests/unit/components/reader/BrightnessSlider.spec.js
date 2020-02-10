import { shallowMount, createLocalVue } from '@vue/test-utils'
import BrightnessSlider from '@/components/reader/BrightnessSlider'
import Slider from 'vue-slider-component'
import Vuex from 'vuex'
import reader from '@/store/modules/reader'

jest.mock('@/store/modules/reader')
reader.state = {
    brightness: 100
}

const localVue = createLocalVue()
localVue.use(Vuex)

describe('BrightnessSlider', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(BrightnessSlider, {
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

        expect(slider.props('value')).toEqual(reader.state.brightness)
    })

    it('calls setBrightness mutation when Slider changes value', () => {
        const slider = wrapper.find(Slider)
        const NEW_BRIGHTNESS = 125

        slider.vm.$emit('change', NEW_BRIGHTNESS)

        expect(reader.mutations.setBrightness).toHaveBeenCalled()
        expect(reader.mutations.setBrightness.mock.calls[0][1]).toEqual(NEW_BRIGHTNESS)
    })
})