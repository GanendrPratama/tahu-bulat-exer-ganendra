import { createSupabaseServerClient } from '@/backend/server'
import Card from '../Card'
import ReviewFormButton from './ReviewFormButton'
import ShowAllToggle from './ShowAllToggle'
import featuredReviews from '@/backend/featuredReviews.json'

export default async function ReviewList() {
  const supabase = await createSupabaseServerClient()
  const { data: { session } } = await supabase.auth.getSession()
  
  const { data: featuredData } = await supabase
    .from('reviews')
    .select()
    .in('id', [featuredReviews.firstID, featuredReviews.secondID, featuredReviews.thirdID])
  
  const { data: allData } = await supabase
    .from('reviews')
    .select()
    .order('created_at', { ascending: false })

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <ReviewFormButton session={session} />
        <ShowAllToggle allReviews={allData} />
      </div>

      <div className="h-[600px] overflow-y-auto">
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
      </div>
    </div>
  )
}