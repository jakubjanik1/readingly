import { shallowMount } from '@vue/test-utils'
import Dictionary from '@/components/reader/Dictionary'
import moxios from 'moxios'
import Vue from 'vue'
Vue.config.ignoredElements = ['modal']

describe('Dictionary', () => {
    beforeEach(() => moxios.install())
    afterAll(() => moxios.uninstall())

    it('shows info when translations are not available', async (done) => {
        moxios.stubRequest(process.env.VUE_APP_NOW_API_URL + '/translate/badword', {
            response: {}
        })

        const wrapper = shallowMount(Dictionary, {
            propsData: {
                word: 'badword'
            }
        })

        await wrapper.vm.$nextTick()
        expect(wrapper.html()).toContain('Loading...')

        moxios.wait(() => {
            expect(wrapper.html()).toContain('We cannot find translations of this word')
            done()
        })
    })

    it('shows translations when are available', (done) => {
        moxios.stubRequest(process.env.VUE_APP_NOW_API_URL + '/translate/mutter', {
            response: {
                'mutter {noun}': [ 'mamrotanie' ],
                'to mutter {vb}': [ 'szemrać', 'mamrotać', 'przebąkiwać', 'mruknąć' ]
            }
        })

        const wrapper = shallowMount(Dictionary, {
            propsData: {
                word: 'mutter'
            }
        })

        expect(wrapper.html()).toContain('Loading...')

        moxios.wait(() => {
            expect(wrapper.html()).toMatchSnapshot()
            done()
        })
    })
})