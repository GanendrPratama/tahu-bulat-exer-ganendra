import Navbar from "@/components/Navbar";
import AdminReviewList from "@/components/ReviewForm/AdminReviewList";
import PostHogDashboard from "@/components/PostHogDashBoard";

export default function Dashboard() {
    return (
        <>
            <Navbar />
            <div className="w-full pt-20"> 
                <div className="h-[calc(100vh-280px)] overflow-y-auto">
                    <AdminReviewList />
                </div>
            </div>
        </>
    )
}