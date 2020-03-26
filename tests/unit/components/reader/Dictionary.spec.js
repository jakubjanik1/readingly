import { shallowMount } from '@vue/test-utils'
import Dictionary from '@/components/reader/Dictionary'
import moxios from 'moxios'

describe('<Dictionary />', () => {
    const API_URL = process.env.VUE_APP_NOW_API_URL

    beforeEach(() => moxios.install())
    afterAll(() => moxios.uninstall())

    it('shows info when translations are not available', async (done) => {
        moxios.stubRequest(`${API_URL}/translate/badword`, {
            response: {}
        })

        const wrapper = mountDictionary('badword')

        await wrapper.vm.$nextTick()
        expect(wrapper.html()).toContain('Loading...')

        moxios.wait(() => {
            expect(wrapper.html()).toContain('We cannot find translations of this word')
            done()
        })
    })

    it('shows translations when are available', (done) => {
        moxios.stubRequest(`${API_URL}/translate/mutter`, {
            response: {
                'mutter {noun}': [ 'mamrotanie' ],
                'to mutter {vb}': [ 'szemrać', 'mamrotać', 'przebąkiwać', 'mruknąć' ]
            }
        })

        const wrapper = mountDictionary('mutter')

        expect(wrapper.html()).toContain('Loading...')

        moxios.wait(() => {
            expect(wrapper.html()).toMatchSnapshot()
            done()
        })
    })

    function mountDictionary(word) {
        return shallowMount(Dictionary, {
            propsData: { word }
        })
    }
})