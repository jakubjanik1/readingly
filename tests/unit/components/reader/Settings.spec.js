import { shallowMount } from '@vue/test-utils'
import Settings from '@/components/reader/Settings'

describe('<Settings />', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(Settings)
    })

    it('shows BrightnessSlider', () => {
        const brightnessSlider = wrapper.find({ name: 'BrightnessSlider' })

        expect(brightnessSlider.exists()).toBe(true)
    })

    it('shows FontSizeSlider', () => {
        const fontSizeSlider = wrapper.find({ name: 'FontSizeSlider' })

        expect(fontSizeSlider.exists()).toBe(true)
    })

    it('shows ThemePicker', () => {
        const themePicker = wrapper.find({ name: 'ThemePicker' })

        expect(themePicker.exists()).toBe(true)
    })

    it('shows FontPicker', () => {
        const fontPicker = wrapper.find({ name: 'FontPicker' })

        expect(fontPicker.exists()).toBe(true)
    })
})