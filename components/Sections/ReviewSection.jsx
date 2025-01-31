import ReviewList from "../ReviewForm/ReviewList"

export default function ReviewSection() {
    return (
        <section id="reviews" className="relative h-screen w-full bg-gray-50 snap-start pt-20 md:pt-24 lg:pt-32">
            <div className="container mx-auto px-4 max-w-7xl">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 lg:mb-16 text-[#FA932D]">
                    What Our Customers Say
                </h2>
                <ReviewList />
            </div>
        </section>
    )
}