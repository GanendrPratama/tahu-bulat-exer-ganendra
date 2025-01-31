
import TitleSection from '@/components/Sections/TitleSection';
import ReviewSection from '@/components/Sections/ReviewSection';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div className="h-screen snap-y snap-mandatory overflow-y-scroll">
      <Navbar />
      <TitleSection />
      <div>
        <ReviewSection />
      </div>
    </div>
  );
}