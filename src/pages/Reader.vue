<template>
    <Wrapper class="reader" :brightness="brightness">
        <div class="reader__toolbar">
            <ReturnToLibrary />
            <OpenSettings @click="openSettings" />
        </div>

        <EpubViewer :src="book" @text-select="openDictionary" />

        <slideout-panel />
    </Wrapper>
</template>

<script>
import ReturnToLibrary from '@/components/reader/ReturnToLibrary'
import EpubViewer from '@/components/reader/EpubViewer'
import Dictionary from '@/components/reader/Dictionary'
import Settings from '@/components/reader/Settings'
import OpenSettings from '@/components/reader/OpenSettings'
import Vue from 'vue'
import { mapState } from 'vuex'
import styled from 'vue-styled-components'

const Wrapper = styled('div', { brightness: Number })`
    filter: brightness(${ props => props.brightness }%);
`

Vue.component('Dictionary', Dictionary)
Vue.component('Settings', Settings)

export default {
    name: 'Reader',
    components: {
        Wrapper,
        ReturnToLibrary,
        OpenSettings,
        EpubViewer
    },
    data() {
        return {
            book: process.env.VUE_APP_FIREBASE_STORAGE_URL.replace('@', this.$route.params.book)
        }
    },
    computed: mapState('reader', ['brightness']),
    methods: {
        openDictionary(word) {
            this.showPanel('Dictionary', { word })
        },
        openSettings() {
            this.showPanel('Settings')
        },
        showPanel(component, props) {
            this.$showPanel({ 
                component,
                props,
                openOn: 'bottom',
                height: '400'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .reader {
        &__toolbar {
            background: #f9f9f9;
            padding: 0 1em;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
</style>