import { shallowMount } from '@vue/test-utils'
import Settings from '@/components/reader/Settings'

describe('Settings', () => {
    it('shows FontSizeSlider', () => {
        const wrapper = shallowMount(Settings)

        const fontSizeSlider = wrapper.find({ name: 'FontSizeSlider' })

        expect(fontSizeSlider.exists()).toBe(true)
    })
})