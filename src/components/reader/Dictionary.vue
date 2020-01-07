<template>
    <div class="dictionary">
        <div class="dictionary__word">{{ word }}</div>

        <div v-if="loading">Loading...</div>
        <div v-else-if="isEmpty(translations)">We cannot find translations of this word</div>
        <div class="dictionary__translations" v-else>
            <div 
                v-for="(words, key) in translations"
                :key="key"    
            >
                <div class="dictionary__key">{{ key }}</div>
                <div>{{ words.join(' ● ') }}</div>
            </div>
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

<style lang="scss" scoped>
    .dictionary {
        text-align: center;
        max-width: 768px;
        padding: 1em;

        &__word {
            font: {
                weight: 600;
                size: 1.2em;
            }
            color: #ff7315;
            text-transform: uppercase;
            padding-bottom: 1em;
        }

        &__key {
            font-weight: 600;
        }

        &__translations > :not(:first-child) {
            padding-top: 1em;
        }   
    }
</style>