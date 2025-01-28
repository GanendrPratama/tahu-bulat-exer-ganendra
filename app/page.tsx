import Image from "next/image";
import ReviewList from '@/components/ReviewList';
import GoogleLoginButton from '@/components/googleLoginButton';

export default function Home() {
  return (
    <div>
      <div>
        <GoogleLoginButton />
      </div>
      <div>
        <h1>Reviews</h1>
        <ReviewList />
      </div>
    </div>
  );
}
