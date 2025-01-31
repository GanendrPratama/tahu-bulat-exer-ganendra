export default function TitleSection() {
    return (
        <section className="relative h-screen w-full snap-start">
            {/* Background Image */}
            <div 
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/TahuBulatTitle.webp')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            />

            {/* Content Container */}
            <div className="relative h-full flex flex-col justify-between z-10">
                {/* Main Content */}
                <div className="flex-1 flex items-center">
                    <div className="px-4 mx-auto max-w-screen-xl text-center">
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                            Tahu Bulat Pak Edi
                        </h1>
                        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                            Tahu bulat digoreng dadakan, lima ribu dapat sepuluh. Jangan lupa beli ya!
                        </p>
                        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                            <a 
                                href="#reviews" 
                                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-[#FA932D] hover:bg-[#fb9f45] focus:ring-4 focus:ring-[#FA932D]"
                            >
                                See Reviews
                                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="pb-8 text-center text-white">
                    <div className="animate-bounce">
                        <p className="text-sm mb-2">Scroll to see more</p>
                        <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    )
}