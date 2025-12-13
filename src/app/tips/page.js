'use client'

import React, { useState } from 'react';
import { BookOpen, Play, ChevronRight, Clock, User, Search, Award, Heart } from 'lucide-react';
import LuxuryFooter from '../components/Footer';

export default function TipsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);

  const blogPosts = [
    {
      id: 1,
      title: "Morning Skincare Routine for Sensitive Skin",
      category: "skincare",
      author: "Dr. Sarah Chen",
      date: "Oct 10, 2025",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=400&fit=crop",
      excerpt: "Discover the perfect morning routine that protects and nourishes sensitive skin while keeping you fresh all day.",
      featured: true
    },
    {
      id: 2,
      title: "Understanding Natural Fragrance Ingredients",
      category: "ingredients",
      author: "Emma Rodriguez",
      date: "Oct 8, 2025",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=400&fit=crop",
      excerpt: "A comprehensive guide to the natural ingredients we use and why they're beneficial for your skin.",
      featured: false
    },
    {
      id: 3,
      title: "Evening Skincare: Wind Down with Aromatherapy",
      category: "skincare",
      author: "Dr. Michael Lee",
      date: "Oct 5, 2025",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&h=400&fit=crop",
      excerpt: "Learn how to incorporate solid perfumes into your nighttime routine for better sleep and skin health.",
      featured: false
    },
    {
      id: 4,
      title: "The Power of Essential Oils in Fragrances",
      category: "ingredients",
      author: "Isabella Martinez",
      date: "Oct 3, 2025",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1546731811-36ca2b7bd66a?w=600&h=400&fit=crop",
      excerpt: "Explore how essential oils not only smell amazing but also provide therapeutic benefits for your skin.",
      featured: true
    },
    {
      id: 5,
      title: "Layering Fragrances Like a Professional",
      category: "skincare",
      author: "Sophie Anderson",
      date: "Sep 28, 2025",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&h=400&fit=crop",
      excerpt: "Master the art of fragrance layering to create your unique signature scent that lasts all day.",
      featured: false
    },
    {
      id: 6,
      title: "Botanical Extracts: Nature's Gift to Your Skin",
      category: "ingredients",
      author: "Dr. Sarah Chen",
      date: "Sep 25, 2025",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=600&h=400&fit=crop",
      excerpt: "Discover the science behind botanical extracts and how they enhance both fragrance and skincare.",
      featured: false
    }
  ];

  const videoTutorials = [
    {
      id: 1,
      title: "How to Apply Solid Perfume for Maximum Longevity",
      duration: "3:45",
      views: "12.5K",
      thumbnail: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Creating Your Daily Skincare & Fragrance Ritual",
      duration: "5:20",
      views: "8.3K",
      thumbnail: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Understanding Your Skin Type for Better Fragrance",
      duration: "4:15",
      views: "15.2K",
      thumbnail: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&h=400&fit=crop"
    },
    {
      id: 4,
      title: "Sustainable Beauty: Eco-Friendly Fragrance Tips",
      duration: "6:30",
      views: "9.7K",
      thumbnail: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop"
    }
  ];

  const quizQuestions = [
    {
      question: "What's your typical daily activity level?",
      options: [
        { text: "Active & Outdoors", value: "fresh" },
        { text: "Office & Professional", value: "elegant" },
        { text: "Creative & Artistic", value: "unique" },
        { text: "Relaxed & Casual", value: "calm" }
      ]
    },
    {
      question: "Which scent family appeals to you most?",
      options: [
        { text: "Citrus & Fresh", value: "fresh" },
        { text: "Floral & Romantic", value: "elegant" },
        { text: "Woody & Earthy", value: "unique" },
        { text: "Vanilla & Sweet", value: "calm" }
      ]
    },
    {
      question: "What's your skin type?",
      options: [
        { text: "Oily", value: "fresh" },
        { text: "Normal", value: "elegant" },
        { text: "Dry", value: "calm" },
        { text: "Sensitive", value: "unique" }
      ]
    },
    {
      question: "When do you typically wear fragrance?",
      options: [
        { text: "Morning & Day", value: "fresh" },
        { text: "Work & Meetings", value: "elegant" },
        { text: "Evening & Events", value: "unique" },
        { text: "Anytime", value: "calm" }
      ]
    }
  ];

  const quizResults = {
    fresh: {
      name: "Ocean Breeze",
      description: "Fresh, invigorating scents that keep you energized throughout the day. Perfect for active lifestyles.",
      notes: "Citrus, Sea Salt, Sage",
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&h=600&fit=crop"
    },
    elegant: {
      name: "Velvet Rose",
      description: "Sophisticated and refined fragrances for the modern professional. Timeless elegance in every note.",
      notes: "Rose, Jasmine, Sandalwood",
      image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=500&h=600&fit=crop"
    },
    unique: {
      name: "Noir Mystique",
      description: "Bold and distinctive scents for those who dare to be different. Make a statement with every wear.",
      notes: "Tobacco, Patchouli, Spice",
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&h=600&fit=crop"
    },
    calm: {
      name: "Pure Harmony",
      description: "Soothing and comforting fragrances that create a sense of peace. Perfect for everyday wear.",
      notes: "Lavender, Cedar, Vanilla",
      image: "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?w=500&h=600&fit=crop"
    }
  };

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleQuizAnswer = (value) => {
    const newAnswers = { ...quizAnswers, [quizStep]: value };
    setQuizAnswers(newAnswers);

    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      const counts = {};
      Object.values(newAnswers).forEach(val => {
        counts[val] = (counts[val] || 0) + 1;
      });
      const result = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
      setQuizResult(result);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers({});
    setQuizResult(null);
  };

  return (
   <>
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0f1629] to-[#1a1f3a]">
      
      <div className="border-b border-amber-200/10 bg-gradient-to-r from-[#0a1628]/80 to-[#1a2942]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 mb-4">
              <h1 className="text-5xl md:text-6xl font-light text-white tracking-[0.25em] uppercase">
                Tips & Guides
              </h1>
            </div>
            <p className="text-xl text-amber-100/70 font-light tracking-wide">
              Expert advice for fragrance, skincare, and wellness
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">

        <div className="mb-20">
          <div className="bg-gradient-to-br from-[#1a2540]/80 to-[#0f1629]/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-amber-200/10 shadow-2xl">
            <div className="grid lg:grid-cols-2">
              
              <div className="relative h-64 lg:h-auto">
                <img
                  src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop"
                  alt="Find Your Scent"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/90 via-[#0a1628]/50 to-transparent" />
                
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="text-center">
                    <Award className="w-16 h-16 text-amber-400 mx-auto mb-4 animate-pulse" />
                    <h2 className="text-3xl font-light text-white tracking-wide mb-2">
                      Find Your Perfect Scent
                    </h2>
                    <p className="text-amber-100/80 text-sm tracking-wider">
                      Take our personalized quiz
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8 lg:p-12">
                {!quizResult ? (
                  <>
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-amber-300 text-sm tracking-wider uppercase">
                          Question {quizStep + 1} of {quizQuestions.length}
                        </span>
                        <span className="text-amber-100/60 text-sm">
                          {Math.round(((quizStep + 1) / quizQuestions.length) * 100)}%
                        </span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-500 rounded-full"
                          style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }}
                        />
                      </div>
                    </div>

                    <h3 className="text-2xl font-light text-white mb-6 tracking-wide">
                      {quizQuestions[quizStep].question}
                    </h3>

                    <div className="space-y-3">
                      {quizQuestions[quizStep].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuizAnswer(option.value)}
                          className="w-full cursor-pointer p-4 bg-white/5 border border-white/20 rounded-lg text-white text-left hover:bg-white/10 hover:border-amber-500/50 transition-all duration-300 group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-light tracking-wide">{option.text}</span>
                            <ChevronRight className="w-5 h-5 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-600 to-amber-500 flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-3xl font-light text-white mb-2 tracking-wide">
                        Your Perfect Match
                      </h3>
                      <p className="text-amber-100/70 font-light">
                        Based on your preferences
                      </p>
                    </div>

                    <div className="relative rounded-xl overflow-hidden mb-6">
                      <img
                        src={quizResults[quizResult].image}
                        alt={quizResults[quizResult].name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent" />
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-2xl font-light text-amber-400 tracking-wide">
                        {quizResults[quizResult].name}
                      </h4>
                      <p className="text-amber-100/80 leading-relaxed font-light">
                        {quizResults[quizResult].description}
                      </p>
                      <div className="inline-block px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full">
                        <p className="text-amber-300 text-sm tracking-wider uppercase">
                          Notes: {quizResults[quizResult].notes}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-6">
                      <button className="flex-1 py-3 bg-gradient-to-br from-[#d4af37] via-[#f4e5c2] to-[#d4af37] text-[#1a1a1a] text-sm tracking-[0.15em] uppercase font-semibold rounded-lg shadow-xl transition-all duration-300 hover:shadow-2xl hover:from-[#f0d678] hover:via-[#fff5dc] hover:to-[#f0d678] relative overflow-hidden border border-[#b8941f]">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-black/20 pointer-events-none" />
                        <span className="relative z-10">Shop Now</span>
                      </button>
                      <button 
                        onClick={resetQuiz}
                        className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white text-sm tracking-wider uppercase hover:bg-white/20 transition-all duration-300"
                      >
                        Retake
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-light text-white tracking-[0.2em] uppercase mb-2">
                Video Tutorials
              </h2>
              <p className="text-amber-100/70 font-light">
                Learn from our experts
              </p>
            </div>
            <Play className="w-8 h-8 text-amber-400" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videoTutorials.map((video) => (
              <div
                key={video.id}
                className="group relative bg-gradient-to-b from-[#1a2540] to-[#0f1629] rounded-xl overflow-hidden border border-amber-200/10 hover:border-amber-500/30 transition-all duration-500 hover:scale-[1.02] cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-600 to-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>

                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 rounded text-white text-xs font-medium">
                    {video.duration}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-white font-light mb-2 line-clamp-2 leading-snug">
                    {video.title}
                  </h3>
                  <p className="text-amber-100/60 text-xs">
                    {video.views} views
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-light text-white tracking-[0.2em] uppercase mb-2">
                Expert Articles
              </h2>
              <p className="text-amber-100/70 font-light">
                In-depth guides and tips
              </p>
            </div>
            <BookOpen className="w-8 h-8 text-amber-400" />
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex gap-3">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-5 cursor-pointer py-2 rounded-full text-sm tracking-wider uppercase font-medium transition-all duration-300 ${
                  activeCategory === 'all'
                    ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg'
                    : 'bg-white/5 text-amber-100/70 border border-white/10 hover:bg-white/10'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveCategory('skincare')}
                className={`px-5 py-2 cursor-pointer rounded-full text-sm tracking-wider uppercase font-medium transition-all duration-300 ${
                  activeCategory === 'skincare'
                    ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg'
                    : 'bg-white/5 text-amber-100/70 border border-white/10 hover:bg-white/10'
                }`}
              >
                Skincare
              </button>
              <button
                onClick={() => setActiveCategory('ingredients')}
                className={`px-5 py-2 cursor-pointer rounded-full text-sm tracking-wider uppercase font-medium transition-all duration-300 ${
                  activeCategory === 'ingredients'
                    ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg'
                    : 'bg-white/5 text-amber-100/70 border border-white/10 hover:bg-white/10'
                }`}
              >
                Ingredients
              </button>
            </div>

            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-12 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-amber-100/30 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {filteredPosts.filter(p => p.featured)[0] && (
            <div className="mb-12">
              <div className="grid lg:grid-cols-2 gap-8 bg-gradient-to-br from-[#1a2540]/80 to-[#0f1629]/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-amber-200/10 shadow-2xl group hover:border-amber-500/30 transition-all duration-500">
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  <img
                    src={filteredPosts.filter(p => p.featured)[0].image}
                    alt={filteredPosts.filter(p => p.featured)[0].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-amber-600 rounded-full text-white text-xs tracking-wider uppercase font-semibold">
                    Featured
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-300 text-xs tracking-wider uppercase mb-4 w-fit">
                    {filteredPosts.filter(p => p.featured)[0].category}
                  </div>
                  <h3 className="text-3xl font-light text-white mb-4 tracking-wide leading-snug">
                    {filteredPosts.filter(p => p.featured)[0].title}
                  </h3>
                  <p className="text-amber-100/70 font-light leading-relaxed mb-6">
                    {filteredPosts.filter(p => p.featured)[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-amber-100/60 mb-6">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{filteredPosts.filter(p => p.featured)[0].author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{filteredPosts.filter(p => p.featured)[0].readTime}</span>
                    </div>
                  </div>
                  <button className="inline-flex items-center gap-2 text-amber-400 font-medium hover:text-amber-300 transition-colors">
                    Read Article
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.filter(p => !p.featured).map((post) => (
              <div
                key={post.id}
                className="group bg-gradient-to-b from-[#1a2540] to-[#0f1629] rounded-xl overflow-hidden border border-amber-200/10 hover:border-amber-500/30 transition-all duration-500 hover:scale-[1.02] cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1629] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs tracking-wider uppercase">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-light text-white leading-snug line-clamp-2 group-hover:text-amber-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-amber-100/60 text-sm font-light line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-amber-200/10">
                    <div className="flex items-center gap-2 text-xs text-amber-100/50">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                    <button className="text-amber-400 text-sm font-medium hover:text-amber-300 transition-colors flex items-center gap-1">
                      Read
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
    <LuxuryFooter />
   </>
  );
}