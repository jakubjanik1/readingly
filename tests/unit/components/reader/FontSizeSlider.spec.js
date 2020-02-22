import { shallowMount, createLocalVue } from '@vue/test-utils'
import FontSizeSlider from '@/components/reader/FontSizeSlider'
import Vuex from 'vuex'
import reader from '@/store/modules/reader'

jest.mock('@/store/modules/reader')
reader.state = {
    fontSize: 115
}

const localVue = createLocalVue()
localVue.use(Vuex)

describe('<FontSizeSlider />', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(FontSizeSlider, {
            localVue,
            store: new Vuex.Store({
                modules: {
                    reader
                }
            })
        }) 
    })

    it('sets Slider default value from store', () => {
        const slider = wrapper.find({ name: 'Slider' })

        expect(slider.props('value')).toEqual(reader.state.fontSize)
    })

    it('calls setFontSize mutation when Slider changes value', () => {
        const slider = wrapper.find({ name: 'Slider' })
        const NEW_FONT_SIZE = 125

        slider.vm.$emit('change', NEW_FONT_SIZE)

        expect(reader.mutations.setFontSize).toHaveBeenCalled()
        expect(reader.mutations.setFontSize.mock.calls[0][1]).toEqual(NEW_FONT_SIZE)
    })
})