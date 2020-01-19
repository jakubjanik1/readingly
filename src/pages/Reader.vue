<template>
    <div class="reader">
        <ReturnToLibrary />

        <EpubViewer :src="book" @text-select="openDictionary" />

        <slideout-panel />
    </div>
</template>

<script>
import ReturnToLibrary from '@/components/reader/ReturnToLibrary'
import EpubViewer from '@/components/reader/EpubViewer'
import Dictionary from '@/components/reader/Dictionary'
import Vue from 'vue'

Vue.component('Dictionary', Dictionary)

export default {
    name: 'Reader',
    components: {
        ReturnToLibrary,
        EpubViewer
    },
    data() {
        return {
            book: process.env.VUE_APP_FIREBASE_STORAGE_URL.replace('@', this.$route.params.book)
        }
    },
    methods: {
        openDictionary(word) {
            this.$showPanel({ 
                component: 'Dictionary', 
                openOn: 'bottom',
                height: '400', 
                props: { word }
            })
        }
    }
}
</script>