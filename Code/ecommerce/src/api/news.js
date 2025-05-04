// data/news.js
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Get latest news articles
 * @param {number} limit - Number of articles to fetch (default: 4)
 * @returns {Promise<{data: Array, error: Object}>}
 */
export const getLatestNews = async (limit = 4) => {
  // Note: This assumes you'll create a 'news' table in your database
  // If you don't have one yet, we'll return sample data as a fallback
  
  try {
    // Check if the news table exists
    const { error: tableCheckError } = await supabase
      .from('news')
      .select('id')
      .limit(1);
    
    if (tableCheckError) {
      // Table doesn't exist, return sample data
      return { data: sampleNewsArticles.slice(0, limit), error: null };
    }
    
    // If table exists, fetch real data
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error || !data || data.length === 0) {
      return { data: sampleNewsArticles.slice(0, limit), error };
    }
    
    return { data, error };
  } catch (error) {
    console.error('Error fetching news:', error);
    return { data: sampleNewsArticles.slice(0, limit), error };
  }
};

/**
 * Get a single news article by ID
 * @param {number} id - News article ID
 * @returns {Promise<{data: Object, error: Object}>}
 */
export const getNewsById = async (id) => {
  try {
    // Check if the news table exists
    const { error: tableCheckError } = await supabase
      .from('news')
      .select('id')
      .limit(1);
    
    if (tableCheckError) {
      // Table doesn't exist, return sample data
      const article = sampleNewsArticles.find(article => article.id === Number(id));
      return { data: article || null, error: null };
    }
    
    // If table exists, fetch real data
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !data) {
      // Fallback to sample data
      const article = sampleNewsArticles.find(article => article.id === Number(id));
      return { data: article || null, error };
    }
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching news article:', error);
    const article = sampleNewsArticles.find(article => article.id === Number(id));
    return { data: article || null, error };
  }
};

// Sample news articles as fallback data
const sampleNewsArticles = [
  {
    id: 1,
    title: 'New Elite Pro Gaming Controller Series Announced',
    slug: 'new-elite-pro-gaming-controller-series-announced',
    excerpt: 'Our latest gaming controllers feature adaptive triggers, haptic feedback, and extended battery life.',
    content: `
      <p>We're excited to announce our brand new Elite Pro Gaming Controller Series, designed for professional gamers and enthusiasts alike.</p>
      
      <p>The new series introduces several groundbreaking features:</p>
      <ul>
        <li>Adaptive triggers that adjust resistance based on in-game actions</li>
        <li>Advanced haptic feedback for immersive gaming experiences</li>
        <li>Extended battery life of up to 40 hours on a single charge</li>
        <li>Customizable button mapping and profile switching</li>
        <li>Premium materials including soft-touch grips and aircraft-grade aluminum</li>
      </ul>
      
      <p>Professional gamers who have tested the controllers have reported significant improvements in performance and comfort during extended gaming sessions.</p>
      
      <p>The Elite Pro Gaming Controller Series will be available for pre-order next week, with shipping expected to begin next month.</p>
    `,
    imageUrl: '/api/placeholder/800/450',
    author: 'Gaming Tech Team',
    createdAt: '2024-09-28T10:15:00Z',
    category: 'Product News'
  },
  {
    id: 2,
    title: 'Esports Partnership with World Gaming League',
    slug: 'esports-partnership-with-world-gaming-league',
    excerpt: 'We\'re proud to announce our exclusive partnership with the World Gaming League for the upcoming tournament season.',
    content: `
      <p>We are thrilled to announce our partnership with the World Gaming League (WGL) as the exclusive peripheral provider for the upcoming 2025 tournament season.</p>
      
      <p>This partnership represents a significant milestone for our company as we continue to establish ourselves as a leading brand in the competitive gaming industry.</p>
      
      <p>As part of this collaboration:</p>
      <ul>
        <li>All WGL tournaments will feature our latest gaming peripherals</li>
        <li>We'll be developing special edition WGL-branded products</li>
        <li>Professional teams will receive custom gear optimized for tournament play</li>
        <li>Fans will have opportunities to win exclusive merchandise during broadcasts</li>
      </ul>
      
      <p>"We chose this partnership because their products consistently deliver the performance and reliability our players demand," said Marcus Lee, Commissioner of the WGL. "The precision and durability of their peripherals make them the perfect fit for our high-stakes tournaments."</p>
      
      <p>The partnership kicks off with the World Gaming Championship in December, which will be broadcast live on major streaming platforms worldwide.</p>
    `,
    imageUrl: '/api/placeholder/800/450',
    author: 'Marketing Team',
    createdAt: '2024-09-20T14:30:00Z',
    category: 'Esports'
  },
  {
    id: 3,
    title: 'New Gaming Headset with Spatial Audio',
    slug: 'new-gaming-headset-with-spatial-audio',
    excerpt: 'Experience immersive sound with our new gaming headset featuring advanced spatial audio technology.',
    content: `
      <p>Introducing our latest gaming headset, designed for gamers who demand the best in audio quality and comfort.</p>
      
      <p>This headset features:</p>
      <ul>
        <li>Advanced spatial audio technology for an immersive gaming experience</li>
        <li>Comfortable memory foam ear cushions for long gaming sessions</li>
        <li>Adjustable noise-canceling microphone for crystal-clear communication</li>
        <li>Customizable RGB lighting to match your gaming setup</li>
        <li>Durable construction with a lightweight design</li>
      </ul>
      
      <p>Whether you're playing competitively or casually, this headset will elevate your gaming experience to the next level.</p>
    `,
    imageUrl: '/api/placeholder/800/450',
    author: 'Marketing Team',
    createdAt: '2024-09-20T14:30:00Z',
    category: 'Esports'
  }
]