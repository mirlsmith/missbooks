const { createRouter, createWebHashHistory } = VueRouter

import homePage from '../views/home-page.cmp.js'
import bookApp from '../views/book-app.cmp.js'
import bookDetails from '../views/book-details.cmp.js'
import addBooks from '../views/add-books.cmp.js'
import aboutPage from '../views/about-page.cmp.js'

const routerOptions = {
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: homePage
        },
        {
            path: '/book',
            component: bookApp
        },
        {
            path: '/about',
            component: aboutPage
        },
        {
            path: '/book/:id',
            component: bookDetails
        },
        {
            path: '/book/add',
            component: addBooks
        },
        
    ]
}

export const router = createRouter(routerOptions)
