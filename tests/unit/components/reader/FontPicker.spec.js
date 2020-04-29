import { shallowMount, createLocalVue } from '@vue/test-utils'
import FontPicker from '@/components/reader/FontPicker'
import Vuex from 'vuex'
import reader from '@/store/modules/reader'

jest.mock('@/store/modules/reader')

const localVue = createLocalVue()
localVue.use(Vuex)

describe('<FontPicker />', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(FontPicker, {
            localVue,
            store: new Vuex.Store({
                modules: {
                    reader
                }
            })
        })

        jest.clearAllMocks()
    })

    it('calls setFont mutation with null when this option is clicked', () => {
        const defaultFont = wrapper.find('.font-picker__option')

        defaultFont.trigger('click')

        expect(reader.mutations.setFont).toHaveBeenCalled()
        expect(reader.mutations.setFont.mock.calls[0][1]).toEqual(null)
    })

    it('calls setFont mutation with "Robot Slab" when this option is clicked', () => {
        const robotoFont = wrapper.find('.font-picker__option[font="Roboto Slab"]')

        robotoFont.trigger('click')

        expect(reader.mutations.setFont).toHaveBeenCalled()
        expect(reader.mutations.setFont.mock.calls[0][1]).toEqual('Roboto Slab')
    })

    it('calls setFont mutation with "Lora" when this option is clicked', () => {
        const loraFont = wrapper.find('.font-picker__option[font=Lora]')

        loraFont.trigger('click')

        expect(reader.mutations.setFont).toHaveBeenCalled()
        expect(reader.mutations.setFont.mock.calls[0][1]).toEqual('Lora')
    })
})