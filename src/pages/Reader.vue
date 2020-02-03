<template>
    <div class="reader">
        <div class="reader__toolbar">
            <ReturnToLibrary />
            <OpenSettings @click="openSettings" />
        </div>

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

<style lang="scss" scoped>
    .reader {
        &__toolbar {
            padding: 0 1em;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
        }
    }
</style>