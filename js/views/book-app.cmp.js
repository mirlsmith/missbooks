import { bookService } from '../services/book-service.js'
import { eventBus } from '../services/event-bus.service.js'

import bookFilter from '../cmps/book-filter.cmp.js'
import bookList from '../cmps/book-list.cmp.js'
import bookDetails from './book-details.cmp.js'

export default {
    template: `
        <section class="book-app">
            
            <section class="books">
                <book-filter @filter="filterBooks"/>
                <button @click="moreBooks">Add more books</button>
                <book-list
                    @remove="removeBook" 
                    :books="booksToShow"/>
            </section>
            
        </section>
    `,
    data() {
        return {
            books: null,
            filterBy: null,
        }
    },
    created() {
        bookService.query()
            .then(books =>{
                this.books = books
            })
    },
    methods: {
        removeBook(bookId){

            bookService.remove(bookId)
                .then(()=>{
                    const idx = this.books.findIndex(book => book.id === bookId)
                    this.books.splice(idx,1)

                    const msg = {
                        txt: `Book ${bookId} deleted...`,
                        type: 'success',
                    }
                    eventBus.emit('user-msg', msg)
                })

        },
        filterBooks(filterBy){
            this.filterBy = filterBy
        },
        moreBooks(){
            this.$router.push(`/book/add`)
        }

    },

    computed: {
        booksToShow() {
            // console.log('filter by', this.filterBy);
            if (!this.filterBy) return this.books
            const regexName = new RegExp(this.filterBy.name, 'i')
            const maxPrice = this.filterBy.toPrice || Infinity
            return this.books.filter((book) => 
                (regexName.test(book.title)) &&
                 book.listPrice.amount >= this.filterBy.fromPrice &&
                 book.listPrice.amount <= maxPrice 
            )
        }
    },

    components: {
        bookList,
        bookDetails,
        bookFilter,
    },
}