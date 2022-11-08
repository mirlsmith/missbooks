export default {
    props:['review'],
    template: `
        <section class="book-review">
            <h3>Rating {{ review.rate }}</h3>
            <h3>Reviewed by {{ review.username }}</h3>
            <h4>Read on {{ review.readat }}</h4>
            <pre>{{ review.reviewtxt }}</pre>
        </section>
    `,
}