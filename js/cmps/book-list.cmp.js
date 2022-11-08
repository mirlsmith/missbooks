import bookPreview from './book-preview.cmp.js'

export default {
    props:['books'],
    template: `
        <section class="book-list">
            <ul>
                <li v-for="book in books" :key="book.id"   
                    @click="showDetails(book.id)">
                    <book-preview :book="book"/>
                    <button @click.stop ="remove(book.id)">x</button>
                </li>
            </ul>

        </section>
    `,
    methods: {
        remove(bookId){
            this.$emit('remove', bookId)
        },
        showDetails(bookId){
            // this.$emit('selected', book)
            this.$router.push(`/book/${bookId}`)
        }

    },

    computed: {

    },

    components: {
        bookPreview,

    },
}