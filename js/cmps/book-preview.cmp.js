export default {
    props:['book'],
    template: `
        <section class="book-preview">
            <img class="thumbnail" :src="book.thumbnail" alt="book thumbnail" />
            <h4>{{ book.title }}</h4>
            <h5>{{priceWithCurrIcon}}</h5>

        </section>
    `,
    computed: {
        priceWithCurrIcon(){
            const price = this.book.listPrice.amount
            const currCode = this.book.listPrice.currencyCode
            const lang =  this.book.language
            return new Intl.NumberFormat(lang, { style: 'currency', currency: currCode }).format(price)
        }
    }
   
}