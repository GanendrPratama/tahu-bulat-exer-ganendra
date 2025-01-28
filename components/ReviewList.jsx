"use client";
import { useEffect, useState } from 'react';
import { supabase, supabaseUrl, supabaseKey } from '@/backend/client';
import Card from './Card';
import featuredReviews from '@/backend/featuredReviews.json';

export default function ReviewList() {
 const [featured, setFeatured] = useState([]);
 const [allReviews, setAllReviews] = useState([]);
 const [showAll, setShowAll] = useState(false);
 const [showForm, setShowForm] = useState(false);
 const [formData, setFormData] = useState({
   firstname: '',
   lastname: '', 
   star: 1,
   title: '',
   review: ''
 });

 useEffect(() => {
   const fetchReviews = async () => {
     const { data: featuredData } = await supabase
       .from('reviews')
       .select()
       .in('id', [featuredReviews.firstID, featuredReviews.secondID, featuredReviews.thirdID]);
     
     const { data: allData } = await supabase
       .from('reviews')
       .select();

     setFeatured(featuredData || []);
     setAllReviews(allData || []);
   };

   fetchReviews();
 }, []);

 const handleSubmit = async (e) => {
   e.preventDefault();

   if (!formData.firstname.trim() || 
     !formData.lastname.trim() || 
     !formData.star ||
     !formData.title.trim() ||
     !formData.review.trim()) 
     {
      alert('All fields are required');
      return;
     }


   const res = await fetch('/api/addNewReview', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(formData)
   });
   
   if (res.ok) {
     setShowForm(false);
     // Refresh reviews after submission
     const { data: newData } = await supabase.from('reviews').select();
     setAllReviews(newData || []);
     setFormData({ firstname: '', lastname: '', star: 1, title: '', review: '' });
   }
 };

 return (
   <div className="p-4">
     <div className="flex justify-between mb-4">
       <button 
         onClick={() => setShowForm(true)}
         className="bg-blue-500 text-white px-4 py-2 rounded"
       >
         Add Review
       </button>
       <button 
         onClick={() => setShowAll(!showAll)}
         className="bg-green-500 text-white px-4 py-2 rounded"
       >
         {showAll ? 'Show Featured' : 'See All Reviews'}
       </button>
     </div>

     {showForm && (
       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
         <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg w-96">
           <input
             className="w-full mb-2 p-2 border rounded"
             placeholder="First Name"
             value={formData.firstname}
             onChange={(e) => setFormData({...formData, firstname: e.target.value})}
           />
           <input
             className="w-full mb-2 p-2 border rounded"
             placeholder="Last Name"
             value={formData.lastname}
             onChange={(e) => setFormData({...formData, lastname: e.target.value})}
           />
           <input
             type="number"
             min="1"
             max="5"
             className="w-full mb-2 p-2 border rounded"
             placeholder="Stars (1-5)"
             value={formData.star}
             onChange={(e) => setFormData({...formData, star: parseInt(e.target.value)})}
           />
           <input
             className="w-full mb-2 p-2 border rounded"
             placeholder="Title"
             value={formData.title}
             onChange={(e) => setFormData({...formData, title: e.target.value})}
           />
           <textarea
             className="w-full mb-2 p-2 border rounded"
             placeholder="Review"
             value={formData.review}
             onChange={(e) => setFormData({...formData, review: e.target.value})}
           />
           <div className="flex justify-end gap-2">
             <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-200 rounded">
               Cancel
             </button>
             <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
               Submit
             </button>
           </div>
         </form>
       </div>
     )}

     <div className="h-[600px] overflow-y-auto">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         {(showAll ? allReviews : featured).map(review => (
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
 );
}