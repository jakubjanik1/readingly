<template>
    <div class="dictionary">
        <div class="dictionary__word">
            <div>{{ word }}</div>
            <SpeakIcon class="dictionary__speak" @click="speak" />
        </div>

        <ClipLoader
            class="dictionary__loading"
            v-if="loading"
            color="var(--theme-text-color)"
            size="50px"
        />
        <ul class="dictionary__meanings" v-else-if="meanings">
            <li v-for="(meaning, i) in meanings" :key="i">
                <div class="dictionary__part-of-speech">{{ meaning.partOfSpeech }}</div>
                <div class="dictionary__definition">{{ meaning.definition }}</div>
                <div class="dictionary__example">{{ meaning.example }}</div>
                <div class="dictionary__synonyms">{{ meaning.synonyms }}</div>
            </li>
        </ul>

        <ul class="dictionary__translations" v-if="translations">
            <li v-for="([word, translation]) in Object.entries(translations)" :key="word">
                <div class="dictionary__part-of-speech">{{ word }}</div>
                <div class="dictionary__synonyms">{translation}</div>
            </li>
        </ul>
    </div>
</template>

<script>
import SpeakIcon from 'vue-material-design-icons/VolumeHigh'
import ClipLoader from 'vue-spinner/src/ClipLoader'
import { getDictionary, translate } from '@/services/dictionary.service.js'

export default {
    name: 'Dictionary',
    components: { SpeakIcon, ClipLoader },
    props: {
        word: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            meanings: null,
            translations: null,
            audio: null,
            loading: false
        }
    },
    methods: { 
        async loadDictionary() {
          this.loading = true

          const { meanings, audio } = await getDictionary(this.word)
          this.meanings = meanings
          this.audio = audio

          this.loading = false

          const translations = await translate(this.word)
          this.translations = translations
        },
        speak() {
            (new Audio(this.audio)).play()
        }
    },
    watch: {
        word: {
            handler: 'loadDictionary',
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
        background-color: var(--theme-bg-color);
        color: var(--theme-text-color);

        &__loading {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        &__meanings {
            text-align: justify;
            padding-left: 1em;
        }

        &__word {
            font: {
                weight: 600;
                size: 1.2em;
            }
            color: #f7b337;
            text-transform: uppercase;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &__speak {
            color: var(--theme-text-color);
            height: 24px;
            margin-left: 8px;
            cursor: pointer;
        }

        &__part-of-speech {
            font-size: 0.8em;
            margin-bottom: 0.5em;
        }

        &__definition {
            font-weight: 600;
            font-size: 0.85em;
            margin-bottom: 0.5em;
        }

        &__example {
            font-size: 0.75rem;
            margin-bottom: 0.5em;
        }

        &__synonyms {
            font-size: 0.8em;
            color: #f7b337;
            font-weight: 600;
            margin-bottom: 1em;
        }

        &__translations {
            padding-top: 3em;
        }
    }
</style>