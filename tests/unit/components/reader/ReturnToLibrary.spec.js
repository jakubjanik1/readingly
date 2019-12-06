import { shallowMount } from '@vue/test-utils'
import ReturnToLibrary from '@/components/reader/ReturnToLibrary'

describe('ReturnToLibrary', () => {
    it('should navigate to /library on click', () => {
        const wrapper = shallowMount(ReturnToLibrary, {
            mocks: {
                $router: {
                    push: jest.fn()
                }
            }
        })

        wrapper.trigger('click')

        expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'library' })
    }) 
})