// components/home/LatestNews.jsx
import React from 'react';
import SectionTitle from '../shared/SectionTitle';
import NewsCard from '../ui/NewsCard';
// import { news } from '../../api/news';
import Button from '../ui/Button';

const LatestNews = () => {
  // Hardcoded sample news data
  const news = [
    {
      id: 1,
      title: "Next-Gen Gaming Peripherals Coming Soon",
      excerpt: "Get ready for revolutionary haptic feedback technology in our upcoming gaming peripheral lineup.",
      image: "../../media/Sony-PlayStation-PS5-DualSense-Wireless-Controller.png",
      date: "2025-05-01",
      category: "Product News"
    },
    {
      id: 2,
      title: "Esports Tournament Partnership Announced",
      excerpt: "We're excited to announce our partnership with major esports organizations for upcoming tournaments.",
      image: "../../media/controller-2.png",
      date: "2025-04-28",
      category: "Events"
    },
    {
      id: 3,
      title: "Gaming Setup Guide for Beginners",
      excerpt: "Everything you need to know about building your first gaming setup with the right peripherals.",
      image: "../../media/controller-3.jpg",
      date: "2025-04-25",
      category: "Guides"
    }
  ];

  

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <SectionTitle title="Latest News" centered />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {news.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
        <div className="text-center">
          <Button variant="outline">View All News</Button>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;