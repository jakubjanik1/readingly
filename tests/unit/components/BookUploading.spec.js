import { shallowMount } from '@vue/test-utils'
import BookUploading from '@/components/BookUploading'
import ClipLoader from 'vue-spinner/src/ClipLoader'

describe('BookUploading', () => {
    let wrapper
    
    beforeEach(() => {
        wrapper = shallowMount(BookUploading)
    })

    it('renders loading spinner', () => {
        const spinner = wrapper.find(ClipLoader)

        expect(spinner.exists()).toBe(true)
    })  
})