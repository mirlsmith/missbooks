export default {
    template: `
        <section class="book-filter">
            <h2>Filter results</h2>
            <form @submit.prevent="filter" class="filter-form">
                <input 
                    v-model="filterBy.name" 
                    class = "name-input"
                    type="search" 
                    placeholder="Search">
                <input 
                    v-model="filterBy.fromPrice" 
                    class = "minprice-input"
                    type="number" 
                    placeholder="Min price">
                <input 
                    v-model="filterBy.toPrice" 
                    class = "maxprice-input"
                    type="number" 
                    placeholder="Max price">
                <button>Filter</button>
            </form>
        </section>
    `,
    data() {
        return {
            filterBy: {
                name: '',
                fromPrice: 0,
                toPrice: Infinity
            }
        }
    },
    methods: {
        filter(){
            console.log('filtered');
            this.$emit('filter', {...this.filterBy})
        }

    },

    computed: {

    },

    components: {

    },
}