import { shallowMount } from '@vue/test-utils'
import Dictionary from '@/components/reader/Dictionary'
import { translate } from '@/services/api.service'

jest.mock('@/services/api.service', () => ({
    translate: jest.fn()
        .mockImplementationOnce(word => Promise.resolve({}))
        .mockImplementationOnce(word => Promise.resolve({
            'mutter {noun}': [ 'mamrotanie' ],
            'to mutter {vb}': [ 'szemrać', 'mamrotać', 'przebąkiwać', 'mruknąć' ]
        }))
}))

describe('<Dictionary />', () => {
    it('shows info when translations are not available', async () => {
        const wrapper = mountDictionary('badword')

        expect(wrapper.html()).toContain('Loading...')

        await wrapper.vm.$nextTick()
        
        expect(wrapper.html()).toContain('We cannot find translations of this word')
        expect(translate).toHaveBeenCalledWith('badword')
    })

    it('shows translations when are available', async () => {
        const wrapper = mountDictionary('mutter')

        expect(wrapper.html()).toContain('Loading...')

        await wrapper.vm.$nextTick()

        expect(wrapper.html()).toMatchSnapshot()
        expect(translate).toHaveBeenCalledWith('mutter')
    })

    function mountDictionary(word) {
        return shallowMount(Dictionary, {
            propsData: { word }
        })
    }
})