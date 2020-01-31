import { shallowMount } from '@vue/test-utils'
import Settings from '@/components/reader/Settings'

describe('Settings', () => {
    it('shows TextSizeSlider', () => {
        const wrapper = shallowMount(Settings)

        const textSizeSlider = wrapper.find({ name: 'TextSizeSlider' })

        expect(textSizeSlider.exists()).toBe(true)
    })
})