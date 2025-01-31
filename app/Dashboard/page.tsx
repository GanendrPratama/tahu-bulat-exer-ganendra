import Navbar from "@/components/Navbar";
import AdminReviewList from "@/components/ReviewForm/AdminReviewList";
import PostHogDashboard from "@/components/PostHogDashBoard";

export default function Dashboard() {
    return (
        <>
            <Navbar />
            <div className="w-full pt-20"> 
                <div className="h-[calc(100vh-280px)] overflow-y-auto mb-8 pb-8">
                    <AdminReviewList />
                </div>

                <div className="iflex flex-col md:flex-row justify-center items-center gap-4 mt-8 mb-6 w-full max-w-4xl mx-auto px-4">
                    <PostHogDashboard />
                </div>
            </div>
        </>
    )
}