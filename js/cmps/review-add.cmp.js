export default {
    props: ['book'],
    template: `
        <h1>Add review for {{book.title}}</h1>
        <button @click ="this.$emit('canceled')" class="btn-review-close">x</button>
        <form @submit.prevent="save" class = "review-form">
            <fieldset>
                <label> Your Name</label>
                <input ref="name" v-model="review.userName" type="text" />
            </fieldset>
            <fieldset>
                <label> Rating </label>
                <select v-model.number="review.rate">
                    <option v-for="n in 5">{{n}}</option>
                </select>
            </fieldset>
            <fieldset>
                <label>Date read</label>
                <input v-model="review.readAt" type="date" />
            </fieldset>
            <fieldset>
                <textarea v-model="review.reviewTxt" placeholder="Enter your review here" rows="5" cols="35"></textarea>
            </fieldset>
            <button>Submit Review</button>
        </form>
        
    `,
    mounted() {
        this.$refs.name.focus()
    },
    data() {
        return {
            review: {
                id: (Date.now() % 10000),
                userName: 'Books Reader',
                rate: 1,
                readAt: new Date().toISOString().slice(0,10),
                reviewTxt: ''
            }
        }
    },
    methods: {
        save(){
            this.$emit('added', {...this.review}) 
        },
    },
}