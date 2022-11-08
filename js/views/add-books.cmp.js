import resultList from "../cmps/result-list.cmp.js"

import { bookService } from '../services/book-service.js'
import { eventBus } from '../services/event-bus.service.js'

export default {
    template: `
            <section class="add-books">
                <div>
                    <form @submit.prevent="search">
                        <h1>Search a term to find more books</h1>
                        <input 
                        v-model="searchTerm" 
                        class = "search-input"
                        type="search" 
                        placeholder="Search">
                        <button>Search</button>
                    </form>
                </div>

                <div class="results">
                <result-list
                    @add="addBook" 
                    :books="bookResults"/>
                </div>
            </section>
        `,
    data() {
        return {
            searchTerm: '',
            bookResults: [],
        }
    },
    methods: {
        search() {
            this.bookResults = []
            return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=effective%20${this.searchTerm}`)
                .then(({ data }) => {
                    return data.items.map(
                        (item) => {
                            // console.log(item);
                            const { id, volumeInfo: { title } } = item
                            const thumbnailUrl = item.volumeInfo.imageLinks?.thumbnail || '../../img/default-book-img.jpeg'
                            const book = { id, title, thumbnailUrl, item }
                            this.bookResults.push(book)
                            // console.log(book);
                            return item
                        })
                })
        },
        addBook(book) {
            bookService.addGoogleBook(book)
                .then(()=>{

                    const msg = {
                        txt: `Book added to your list!`,
                        type: 'success',
                    }
                    eventBus.emit('user-msg', msg)
                })
        }
    },

    computed: {

    },

    components: {
        resultList
    },
}

