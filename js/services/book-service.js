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
    removeReview
}

function query() {
    // return utilService.loadFromStorage(BOOKS_KEY)
    return storageService.query(BOOKS_KEY)
}

function get(bookId){
    return storageService.get(BOOKS_KEY, bookId)
}

function remove(bookId) {
    // const books = query()
    // const idx = books.findIndex(book => book.id === bookId)
    // books.splice(idx, 1)
    // utilService.saveToStorage(BOOKS_KEY, books)
    return storageService.remove(BOOKS_KEY,bookId)
}

function save(book) {
    // book.id = utilService.makeId(4)
    // const books = query()
    // books.push(book)
    // utilService.saveToStorage(BOOKS_KEY, books)
    // return book
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

function addReview(bookId, review){ //IS MOST OF THIS FUNCTION SUPPOSED TO BE DONE IN THE BOOK-DETAILS COMP?? //WHY DOES THE NEW REVIEW SHOW UP ONLY AFTER REFRESHING??
    return storageService.get(BOOKS_KEY, bookId)
        .then(book => {
            if (book.reviews) book.reviews.push(review)
            else book.reviews = [review]
            return storageService.put(BOOKS_KEY,book)
        })
}

function removeReview(bookId, reviewId){ //IS MOST OF THIS FUNCTION SUPPOSED TO BE DONE IN THE BOOK-DETAILS COMP?? //WHY DOES THE REVIEW GET REMOVED ONLY AFTER REFRESHING??
    return storageService.get(BOOKS_KEY, bookId)
        .then(book => {
            const idx = book.reviews.findIndex(review => review.id === reviewId)
            book.reviews.splice(idx,1)
            return storageService.put(BOOKS_KEY,book)
        })
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOKS_KEY)
    if (!books || !books.length) {
        books = bookData

        utilService.saveToStorage(BOOKS_KEY, books)
    }
    return books
}
