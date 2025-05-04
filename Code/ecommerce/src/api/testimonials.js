// data/testimonials.js
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Get featured testimonials (best product reviews)
 * @param {number} limit - Number of testimonials to fetch (default: 3)
 * @returns {Promise<{data: Array, error: Object}>}
 */
export const getFeaturedTestimonials = async (limit = 3) => {
  // For this implementation, we'll use the reviews table to create testimonials
  // In a production environment, you might have a separate testimonials table
  
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      id,
      rating,
      comment,
      created_at,
      users (id, username, full_name),
      products (id, name)
    `)
    .gte('rating', 4) // Only get 4 or 5 star reviews
    .not('comment', 'is', null) // Only get reviews with comments
    .order('rating', { ascending: false })
    .limit(limit);
  
  if (error || !data) {
    return { 
      data: sampleTestimonials.slice(0, limit), // Fallback to sample data
      error 
    };
  }
  
  const formattedTestimonials = data.map(review => ({
    id: review.id,
    authorName: review.users.full_name || review.users.username,
    authorRole: `Verified Customer`, // Could be fetched from a user_roles table
    content: review.comment,
    productName: review.products.name,
    rating: review.rating,
    date: review.created_at,
    // In a real app, you'd have profile_images for users
    authorImage: '/api/placeholder/100/100'
  }));
  
  return { 
    data: formattedTestimonials.length > 0 
      ? formattedTestimonials 
      : sampleTestimonials.slice(0, limit), 
    error: null 
  };
};

// Sample testimonials as fallback data
const sampleTestimonials = [
  {
    id: 1,
    authorName: 'Mark Perez',
    authorRole: 'Pro Gamer',
    content: 'These gaming controllers are exceptionally well-made. The responsiveness is unmatched, and the ergonomic design makes extended gaming sessions comfortable. Definitely worth the investment!',
    productName: 'Elite Pro Gaming Controller',
    rating: 5,
    date: '2024-09-15T14:30:00Z',
    authorImage: '/api/placeholder/100/100'
  },
  {
    id: 2,
    authorName: 'Lindsay J. Wang',
    authorRole: 'Twitch Streamer',
    content: 'I\'ve tried many headsets, but the Spectra Phantom is on another level. Crystal clear audio, fantastic mic quality, and they\'re so comfortable I can wear them all day during my streams.',
    productName: 'Spectra Phantom Wireless Headphones',
    rating: 5,
    date: '2024-08-23T09:15:00Z',
    authorImage: '/api/placeholder/100/100'
  },
  {
    id: 3,
    authorName: 'Carlos Mendez',
    authorRole: 'Tech Journalist',
    content: 'The Eclipse Nexus keyboard has transformed my typing experience. The keys have the perfect amount of travel and tactile feedback. RGB lighting is customizable and the build quality is exceptional.',
    productName: 'Eclipse Nexus Mechanical Keyboard',
    rating: 5,
    date: '2024-09-05T16:45:00Z',
    authorImage: '/api/placeholder/100/100'
  },
  {
    id: 4,
    authorName: 'Sophia Chen',
    authorRole: 'eSports Coach',
    content: 'As someone who coaches professional players, I recommend this mouse for its precision and reliability. The sensor is flawless and the customization options are extensive.',
    productName: 'HyperWing Pro Gaming Mouse',
    rating: 5,
    date: '2024-08-30T11:20:00Z',
    authorImage: '/api/placeholder/100/100'
  }
];