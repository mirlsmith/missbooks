import longText from '../cmps/long-text.cmp.js'
import reviewAdd from '../cmps/review-add.cmp.js'
import bookReview from '../cmps/book-review.cmp.js'

import { bookService } from '../services/book-service.js'
import { eventBus } from '../services/event-bus.service.js'
// import bookPreview from './book-preview.cmp.js'

export default {
    // props: ['book'],
    template: `
        <section v-if="book" class="book-details">
            <div class= "book-img">
                <img class="thumbnail" :src="book.thumbnail" alt="book thumbnail" />
            </div>
            <div class="book-info">
                <img v-if:="book.listPrice.isOnSale" class="sale" src="../../img/sale.png" alt="" />
                <h2>{{book.title}}</h2>
                <h3 v-for="(author, idx) in book.authors" :key="idx"> 
                    {{author}}
                </h3>
                <h4 v-for="(category, idx) in book.categories" :key="idx"> 
                    {{category}}
                </h4>
                <h4>{{readingLength}}</h4>
                <h5 class="price" :class="priceStyle">{{priceWithCurrIcon}}</h5>
                <h4>{{ageStatus}}</h4>
                <long-text :text="book.description" :maxLength="100" class="text-desc"/>
                <button class="btn-add-review" @click="showReviewModal=true">Add Review</button>
                <button class="btn-close" @click="close()">Close</button>
                <!-- <router-link class="btn-close" to="/book">Close</router-link> -->
            </div>
            <div v-if="showReviewModal" class="add-book-review">  
                <review-add 
                    :book="book" 
                    @canceled="showReviewModal=false"
                    @added="addReview"/>
            </div>
            <div class="book-reviews">
                <ul>
                    <li v-for="review in book.reviews" :key="review.id">
                        <book-review :review="review"/>
                        <button @click ="removeReview(review.id)">x</button>
                    </li>
                </ul>
            </div>
        </section>
    `,
    created() {
        const id = this.$route.params.id
        bookService.get(id)
            .then(book => {
                this.book = book
            })
    },
    data() {
        return {
            book: null,
            showReviewModal: false
        }
    },
    methods: {
        close() {
            this.$router.push(`/book`)
        },
        removeReview(reviewId) {
            bookService.removeReview(this.book.id, reviewId)
                .then((book) => {
                    
                    this.book = book

                    const msg = {
                        txt: `Review deleted`,
                        type: 'success',
                    }
                    eventBus.emit('user-msg', msg)
                })
        },
        addReview(review) {
            bookService.addReview(this.book.id, review)
            .then(book => {
             
                    this.book = book

                    const msg = {
                        txt: `Review saved`,
                        type: 'success',
                    }
                    eventBus.emit('user-msg', msg)
                })
            
            this.showReviewModal = false
        }

    },
    computed: {
        readingLength() {
            const pgCount = this.book.pageCount
            if (pgCount > 500) return 'Long reading'
            else if (pgCount > 200) return 'Decent reading'
            else return 'Light reading'
        },
        ageStatus() {
            const currYear = new Date().getFullYear()
            const years = currYear - this.book.publishedDate
            if (years > 10) return 'Veteran book'
            else if (years < 1) return 'New!'
            return ''
        },
        priceWithCurrIcon() {
            const price = this.book.listPrice.amount
            const currCode = this.book.listPrice.currencyCode
            const lang = this.book.language
            return new Intl.NumberFormat(lang, { style: 'currency', currency: currCode }).format(price)
        },
        priceStyle() {
            const price = this.book.listPrice.amount
            if (price > 150) return 'expensive'
            if (price < 20) return 'cheap'
        },
    },

    components: {
        longText,
        reviewAdd,
        bookReview
    },
}