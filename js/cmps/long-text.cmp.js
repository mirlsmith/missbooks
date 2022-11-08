export default {
    props:['text', 'maxLength'],
    template: `
        <p>{{txtToShow}}
            <button v-if="isLongTxt" @click="toggleText">{{btnTxt}}</button>
        </p>
    `,
    
    data() {
        return {
            isLongTxt: (this.text.length > this.maxLength),
            showAllTxt: false,
        }
    },
    methods: {
        toggleText (){
            this.showAllTxt = !this.showAllTxt
        }
    },

    computed: {
        txtToShow () {
            if (this.showAllTxt || !this.isLongTxt) return this.text
            return this.text.substr(0,this.maxLength)+'...'
        },
        btnTxt(){
            if (this.showAllTxt) return 'Show less'
            return 'Show more'
        }
    },
    }