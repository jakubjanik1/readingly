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
        <div class="dictionary__meanings" v-else-if="meanings">
            <ul v-for="(meaning, i) in meanings" :key="i">
                <li class="dictionary__part-of-speech">{{ meaning.partOfSpeech }}</li>
                <ol>
                  <li v-for="(definition, i) in meaning.definitions" :key="i">
                      <div class="dictionary__definition">{{ definition.definition }}</div>
                      <div class="dictionary__example" v-if="definition.example">{{ definition.example }}</div>
                      <div class="dictionary__words" v-if="Array.isArray(definition.synonyms)">
                          <div v-for="(synonym, i) in definition.synonyms.slice(0, 10)" :key="i">
                              {{ synonym }}
                          </div>
                      </div>
                  </li>
                </ol>
            </ul>
        </div>

        <div class="dictionary__translations" v-if="translations">
            <ul v-for="([word, translation]) in Object.entries(translations)" :key="word">
                <li>
                    <div class="dictionary__part-of-speech">{{ word }}</div>
                    <div class="dictionary__words" v-if="Array.isArray(translation)">
                        <div v-for="(word, i) in translation.slice(0, 10)" :key="i">
                            {{ word }}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
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

          const {meanings, audio} = await getDictionary(this.word)
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
        }

        &__definition {
            font-weight: 600;
            margin-bottom: 0.75em;  
            font-size: 0.9em;
        }

        &__example {
          font-size: 0.75rem;
        }

        &__words {
          display: flex;
          gap: 0.5em;
          overflow: auto;
          margin-top: 0.75em;

          div {
            padding: 0.25em 0.5em;
            border-radius: 0.25em;
            white-space: nowrap;
            border: 2px solid #dedede;
            border-radius: 1.2em;
            font-size: 0.8em;
          }
        }

        &__translations {
          padding-top: 3em;
        }

        ol {
          display: grid;
          grid-template-columns: 100%;
          gap: 1em;
          padding: 0.75em 0.5em 0 0.75em;
          margin: 0;
        }

        ul {
          padding: 1.25em 0.5em 0 0.75em;
          margin: 0;
        }

        li::marker {
          font-weight: 600;
        }
    }
</style>