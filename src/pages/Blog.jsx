import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  PencilSquareIcon, 
  UserIcon, 
  CalendarIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';

const Blog = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Boathouse Retreat on Dal Lake",
      author: "DalLakeDrifter",
      date: "October 12, 2023",
      content: "Drifting on a traditional shikara, we settled into our floating boathouse on Dal Lake in Srinagar. Waking up to the mist over the water and the gentle call of local vendors was simply unforgettable. Evenings were spent sipping kahwa on the deck as the sun set behind the Himalayas.",
      image: "/images/dal_lake.jpg"
    },
    {
      id: 2,
      title: "Trekking the Mystical Ladakh Himalayas",
      author: "HimalayanWanderer",
      date: "September 5, 2023",
      content: "The high-altitude trails around Leh took us through craggy passes, prayer-flag–draped ridges, and remote gompas. Nights spent under star-studded skies and days filled with crisp mountain air made this one of the most rewarding hikes I've ever done. Don’t miss the Pangong Lake detour!",
      image: "/images/trek.webp"
    }
  ]);

  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    image: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPost.title.trim() && newPost.content.trim()) {
      const post = {
        id: posts.length + 1,
        title: newPost.title,
        author: currentUser?.email || "Anonymous",
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        content: newPost.content,
        image: newPost.image || "/images/blog.jpeg"
      };
      setPosts([post, ...posts]);
      setNewPost({ title: '', content: '', image: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-blue-600 mb-4 tracking-tight leading-tight">
            <span className="text-blue-400">Community Travel Stories</span>
          </h1>
            <p className="text-gray-600 text-lg">Share your adventures and inspire others to explore the world</p>
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <PencilSquareIcon className="h-6 w-6 text-blue-500" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Share Your Adventure</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="title"
                  value={newPost.title}
                  onChange={handleInputChange}
                  placeholder="Give your story a captivating title"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
              </div>
              <div>
                <textarea
                  name="content"
                  value={newPost.content}
                  onChange={handleInputChange}
                  placeholder="Share your unforgettable experience..."
                  rows="5"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                ></textarea>
              </div>
              <div>
                <input
                  type="text"
                  name="image"
                  value={newPost.image}
                  onChange={handleInputChange}
                  placeholder="Paste an image URL (optional)"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Post Your Story
              </button>
            </form>
          </div>

          {/* Posts Section */}
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map(post => (
              <div
                key={post.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
              >
                <div className="relative h-64">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">{post.title}</h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <UserIcon className="h-4 w-4 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{post.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
