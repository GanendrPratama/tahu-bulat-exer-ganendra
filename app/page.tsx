import Image from "next/image";
import LoginButton from "@/components/LoginButton";
import ReviewList from '@/components/ReviewForm/ReviewList';
import AuthButton from "@/components/AuthButton";

export default async function Home() {

  return (
    <div>
      <div>
        <AuthButton />
      </div>
      <div>
        <h1>Reviews</h1>
        <ReviewList />
      </div>
    </div>
  );
}
