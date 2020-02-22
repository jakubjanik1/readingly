import { shallowMount } from '@vue/test-utils'
import AddBook from '@/components/library/AddBook'

describe('<AddBook />', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(AddBook)
    })

    it('opens file dialog when component is clicked', (done) => {
        const fileInput = wrapper.find('input[type=file]')    

        fileInput.element.addEventListener('click', () => { done() })

        wrapper.trigger('click')   
    })

    it('broadcasts file when a epub format is chosen', () => {
        wrapper.trigger('click')
        
        const file = chooseFile('book.epub', 'application/epub+zip')

        expect(wrapper.emitted().change).toBeTruthy()
        expect(wrapper.emitted().change[0]).toEqual([file])
    })

    it('broadcasts error when an invalid book format is chosen', () => {
        wrapper.trigger('click')
        
        chooseFile('invalid.jpg', 'image/jpg')

        expect(wrapper.emitted().error).toBeTruthy()
        expect(wrapper.emitted().error[0]).toEqual(['Invalid book format'])
    })

    function chooseFile(name, type) {
        const file = new File([], name, { type })

        const event = new Event('change')
        Object.defineProperty(event, 'target', { value: { files: [file] } })

        const fileInput = wrapper.find('input[type=file]')
        fileInput.element.dispatchEvent(event)

        return file
    }
})