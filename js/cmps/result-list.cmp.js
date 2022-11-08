
export default {
    props:['books'],
    template: `
        <section class="result-list book-list">
            <ul>
                <li v-for="book in books" :key="book.id">
                    <img :src="book.thumbnailUrl" alt="book thumbnail" />
                    <h4>{{book.title}}</h4>
                    <button @click ="this.$emit('add', book.item)">Add this book</button>
                </li>
            </ul>
        </section>
    `,
    methods: {
      
    },

    computed: {
        

    },

    components: {

    },
}