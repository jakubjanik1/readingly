<template>
    <div v-if="loading">Loading...</div>
    <div v-else-if="isEmpty(translations)">We cannot find translations of this word</div>
    <div v-else>
        <div 
            v-for="(words, key) in translations"
            :key="key"    
        >
            {{ key }} <br>
            {{ words.join(' ') }}
        </div>
    </div>
</template>

<script>
import { get } from 'axios'
import { isEmpty } from 'lodash'

export default {
    name: 'Dictionary',
    props: {
        word: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            translations: {},
            loading: true
        }
    },
    async mounted() {
        const { data } = await get(process.env.VUE_APP_NOW_API_URL + `/translate/${ this.word }`)
        this.loading = false

        this.translations = data
    },
    methods: { isEmpty }
}
</script>