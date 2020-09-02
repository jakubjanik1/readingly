<template>
    <div class="dictionary">
        <div class="dictionary__word">
            <div>{{ word }}</div>
            <SpeakIcon class="dictionary__speak" @click="speak" />
        </div>

        <div v-if="loading">Loading...</div>
        <div v-else-if="isEmpty(translations)">We cannot find translations of this word</div>
        <div class="dictionary__translations" v-else>
            <div 
                v-for="(words, key) in translations"
                :key="key"    
            >   
                <div class="dictionary__key">{{ key }}</div>
                <div>{{ words.join(' • ') }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { isEmpty } from 'lodash'
import SpeakIcon from 'vue-material-design-icons/VolumeHigh'
import { translate } from '@/services/api.service'

export default {
    name: 'Dictionary',
    components: { SpeakIcon },
    props: {
        word: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            translations: {},
            loading: false
        }
    },
    methods: { 
        isEmpty,
        async fetchTranslations() {
            this.loading = true
            this.translations = await translate(this.word)
            this.loading = false
        },
        speak() {
            const msg = new SpeechSynthesisUtterance(this.word)
            speechSynthesis.speak(msg)
        }
    },
    watch: {
        word: {
            handler: 'fetchTranslations',
            immediate: true
        }
    }
}
</script>

<style lang="scss">
    .dictionary {
        padding: 1em;
        overflow: auto !important;
        color: #333;
        height: 100%;
        box-sizing: border-box;

        &__word {
            font: {
                weight: 600;
                size: 1.2em;
            }
            color: #f7b337;
            text-transform: uppercase;
            padding-bottom: 1em;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &__speak {
            color: #333;
            height: 24px;
            margin-left: 8px;
            cursor: pointer;
        }

        &__key {
            font-weight: 600;
        }

        &__translations > :not(:first-child) {
            padding-top: 1em;
        }

        & * {
            text-align: center;
        }
    }
</style>