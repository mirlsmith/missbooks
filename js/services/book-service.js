import { utilService } from './util-service.js'
import { storageService } from './async-storage.service.js'

import bookData from '../../data/books.json' assert {type: 'json'}


const BOOKS_KEY = 'books'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    addReview,
    removeReview,
    addGoogleBook
}

function query() {
    return storageService.query(BOOKS_KEY)
}

function get(bookId){
    return storageService.get(BOOKS_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOKS_KEY,bookId)
}

function save(book) {
    if (book.id) return storageService.put(BOOKS_KEY, book)
    else return storageService.post(BOOKS_KEY, book)
}

function getEmptyBook() {
    return {
        id: '',
        title: '',
        subtitle: '',
        authors: [
            ''
        ],
        publishedDate: null,
        description: '',
        pageCount: null,
        categories: [
            ''
        ],
        thumbnail: '',
        language: '',
        listPrice: {
            amount: null,
            currencyCode: '',
            isOnSale: null
        }
    }
}

function addReview(bookId, review){ 
    return storageService.get(BOOKS_KEY, bookId)
        .then(book => {
            if (book.reviews) book.reviews.push(review)
            else book.reviews = [review]
            return storageService.put(BOOKS_KEY,book)
        })
}

function removeReview(bookId, reviewId){ 
    return storageService.get(BOOKS_KEY, bookId)
        .then(book => {
            const idx = book.reviews.findIndex(review => review.id === reviewId)
            book.reviews.splice(idx,1)
            return storageService.put(BOOKS_KEY,book)
        })
}

function addGoogleBook(googleBook) {

        const {id, volumeInfo} = googleBook
        const thumbnail = volumeInfo.imageLinks?.thumbnail || '../../img/default-book-img.jpeg'
        const {title, subtitle, description, authors, publishedDate, pageCount, categories, language} = volumeInfo
        const amount = utilService.getRandomIntInclusive(10,200)
        const currencyCode = 'USD'
        const isOnSale = (utilService.getRandomIntInclusive(0,1) > 0.2) ? true : false
        const listPrice = {amount, currencyCode, isOnSale}
        
        const book = {id, thumbnail, title, subtitle, description, 
            authors, publishedDate, pageCount, categories,
            language, listPrice}

    return storageService.post(BOOKS_KEY, book, false)
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOKS_KEY)
    if (!books || !books.length) {
        books = bookData

        utilService.saveToStorage(BOOKS_KEY, books)
    }
    return books
}


        