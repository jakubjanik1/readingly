<template>
    <div class="reader">
        <ReturnToLibrary />
        <OpenSettings @click="openSettings" />

        <EpubViewer :src="book" @text-select="openDictionary" />

        <slideout-panel />
    </div>
</template>

<script>
import ReturnToLibrary from '@/components/reader/ReturnToLibrary'
import EpubViewer from '@/components/reader/EpubViewer'
import Dictionary from '@/components/reader/Dictionary'
import Settings from '@/components/reader/Settings'
import OpenSettings from '@/components/reader/OpenSettings'
import Vue from 'vue'

Vue.component('Dictionary', Dictionary)
Vue.component('Settings', Settings)

export default {
    name: 'Reader',
    components: {
        ReturnToLibrary,
        OpenSettings,
        EpubViewer
    },
    data() {
        return {
            book: process.env.VUE_APP_FIREBASE_STORAGE_URL.replace('@', this.$route.params.book)
        }
    },
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