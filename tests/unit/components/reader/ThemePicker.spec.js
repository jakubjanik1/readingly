import { shallowMount, createLocalVue } from '@vue/test-utils'
import ThemePicker from '@/components/reader/ThemePicker'
import Vuex from 'vuex'
import reader from '@/store/modules/reader'

jest.mock('@/store/modules/reader')

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ThemePicker', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(ThemePicker, {
            localVue,
            store: new Vuex.Store({
                modules: {
                    reader
                }
            })
        })

        jest.clearAllMocks()
    })

    it('calls setTheme mutation with "white" when this option is clicked', () => {
        const whiteTheme = wrapper.find('.theme-picker__option[theme=white]')

        whiteTheme.trigger('click')

        expect(reader.mutations.setTheme).toHaveBeenCalled()
        expect(reader.mutations.setTheme.mock.calls[0][1]).toEqual('white')
    })

    it('calls setTheme mutation with "black" when this option is clicked', () => {
        const blackTheme = wrapper.find('.theme-picker__option[theme=black]')

        blackTheme.trigger('click')

        expect(reader.mutations.setTheme).toHaveBeenCalled()
        expect(reader.mutations.setTheme.mock.calls[0][1]).toEqual('black')
    })

    it('calls setTheme mutation with "sepia" when this option is clicked', () => {
        const sepiaTheme = wrapper.find('.theme-picker__option[theme=sepia]')

        sepiaTheme.trigger('click')

        expect(reader.mutations.setTheme).toHaveBeenCalled()
        expect(reader.mutations.setTheme.mock.calls[0][1]).toEqual('sepia')
    })
})