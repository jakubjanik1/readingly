<template>    
    <div class="book">
        <RemoveIcon 
            v-if="removable"
            class="book__remove" 
            @click="removeBook(book)" 
            :size="20" 
        />
        
        <img 
            class="book__thumbnail"
            :src="thumbnail"
            @error="showDefaultThumbnail"
            @click="openBook"
        >
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import RemoveIcon from 'vue-material-design-icons/Close'

const DEFAULT_BOOK_COVER = 'https://firebasestorage.googleapis.com/v0/b/readingly-ab5f7.appspot.com/o/default_cover.png?alt=media'

export default {
    name: 'Book',
    components: {
        RemoveIcon
    },
    props: {
        src: {
            type: String,
            required: true,
            default: ''
        },
        removable: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            thumbnail: null,
            book: /o\/(.*)\?/.exec(this.src)[1]
        }
    },
    methods: {
        ...mapActions('library', ['removeBook']),
        openBook() {
            const { book } = this
            this.$router.push({ name: 'reader', params: { book }})
        },
        showDefaultThumbnail() {
            this.thumbnail = DEFAULT_BOOK_COVER
        }
    },
    mounted() {    
        this.thumbnail = this.src.replace('epub', 'jpg')
    }
}
</script>

<style lang="scss" scoped>
    .book {
        cursor: pointer;
        position: relative;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

        &__remove {
            color: #fff;
            border-radius: 50%;
            padding: 2px;
            background: #f7b337;
            position: absolute;
            right: -5px;
            top: -5px;
            display: flex;
        }

        &__thumbnail {
            width: 120px;
            height: 100%;
            border-radius: 4px;
        }
    }
</style>