import { shallowMount } from '@vue/test-utils'
import Slider from '@/components/ui/Slider'
import VueSlider from 'vue-slider-component'

describe('<Slider />', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(Slider, {
            slots: {
                'left-label': '<div class="left-label"></div>',
                'right-label': '<div class="right-label"></div>'
            },
            propsData: {
                value: 50,
                min: 1,
                max: 80
            }
        })   
    })

    it('renders label slots correctly', () => {
        expect(wrapper.find('.left-label').exists()).toBe(true)
        expect(wrapper.find('.right-label').exists()).toBe(true)
    })

    it('contains slider with correctly passed props', () => {
        const slider = wrapper.find(VueSlider)

        expect(slider.attributes('value')).toEqual('50')
        expect(slider.attributes('min')).toBe('1')
        expect(slider.attributes('max')).toBe('80')
    })

    it('emits "change" when slider changes value', () => {
        const slider = wrapper.find(VueSlider)
        slider.vm.$emit('change', 57)

        expect(wrapper.emitted('change')).toBeTruthy()
        expect(wrapper.emitted('change')[0]).toStrictEqual([57])
    })  
})