import { shallowMount } from '@vue/test-utils'
import OpenSettings from '@/components/reader/OpenSettings'

describe('<OpenSettings />', () => {
    it('emits "click" event when component is clicked', () => {
        const wrapper = shallowMount(OpenSettings)

        wrapper.trigger('click')
        
        expect(wrapper.emitted('click')).toBeTruthy()
    })
})