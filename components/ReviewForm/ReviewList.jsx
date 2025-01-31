import { createSupabaseServerClient } from '@/backend/server'
import Card from './Card'
import ReviewFormButton from './ReviewFormButton'
import ShowAllToggle from './ShowAllToggle'
import reviews from '@/backend/featuredReviews'

export default async function ReviewList() {
  const supabase = await createSupabaseServerClient()
  const { data: { session } } = await supabase.auth.getSession()
  
  const { data: featuredData } = await supabase
    .from('reviews')
    .select()
    .in('id', [reviews.firstID, reviews.secondID, reviews.thirdID])
  
  const { data: allData } = await supabase
    .from('reviews')
    .select()
    .order('created_at', { ascending: false })

    return (
      <div className="w-full">
        <div className="h-[calc(100vh-280px)] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredData?.map(review => (
              <Card
                key={review.id}
                firstname={review.firstname}
                lastname={review.lastname}
                star={review.star}
                title={review.title}
                review={review.review}
              />
            ))}
          </div>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8 mb-6 w-full max-w-4xl mx-auto px-4">
            <ReviewFormButton session={session} />
            <ShowAllToggle allReviews={allData} />
          </div>
        </div>
      </div>
    )
}