import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Category = () => {
  const [domain, setCategories] = useState([]);
  const scrollRef = useRef(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://otruyenapi.com/v1/api/the-loai');
        setCategories(response.data.data.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Define a function to choose an icon based on category name
  const getCategoryEmoji = (name) => {
    switch (name.toLowerCase()) {
      case 'action':
        return '⚡️';
      case 'adult':
        return '🔞';
      case 'adventure':
        return '🌍';
      case 'anime':
        return '💫';
      case 'chuyen sinh':
        return '🔄';
      case 'comedy':
        return '😂';
      case 'comic':
        return '📚';
      case 'cooking':
        return '🍳';
      case 'cổ đại':
        return '🏰';
      case 'doujinshi':
        return '🎨';
      case 'drama':
        return '🎭';
      case 'đam mỹ':
        return '👨‍❤️‍👨';
      case 'ecchi':
        return '👙';
      case 'fantasy':
        return '🧚‍♂️';
      case 'gender bender':
        return '👫';
      case 'harem':
        return '👸🏼';
      case 'historical':
        return '⏳';
      case 'horror':
        return '👻';
      case 'josei':
        return '👩';
      case 'live action':
        return '🎬';
      case 'manga':
        return '📘';
      case 'manhua':
        return '📖';
      case 'manhwa':
        return '🇰🇷';
      case 'martial arts':
        return '🥋';
      case 'mature':
        return '🔞';
      case 'mecha':
        return '🤖';
      case 'mystery':
        return '🔍';
      case 'ngôn tình':
        return '❤️';
      case 'one shot':
        return '🎯';
      case 'psychological':
        return '🧠';
      case 'romance':
        return '💑';
      case 'school life':
        return '🏫';
      case 'sci-fi':
        return '🛸';
      case 'seinen':
        return '🧑';
      case 'shoujo':
        return '🌸';
      case 'shoujo ai':
        return '👩‍❤️‍👩';
      case 'shounen':
        return '👦';
      case 'shounen ai':
        return '👨‍❤️‍👨';
      case 'slice of life':
        return '🌞';
      case 'smut':
        return '💋';
      case 'soft yaoi':
        return '👨‍❤️‍💋‍👨';
      case 'soft yuri':
        return '👩‍❤️‍💋‍👩';
      case 'sports':
        return '🏀';
      case 'supernatural':
        return '👻';
      case 'tạp chí truyện tranh':
        return '📰';
      case 'thiếu nhi':
        return '👶';
      case 'tragedy':
        return '😢';
      case 'trinh thám':
        return '🕵️‍♂️';
      case 'truyện scan':
        return '🔖';
      case 'truyện màu':
        return '🌈';
      case 'việt nam':
        return '🇻🇳';
      case 'webtoon':
        return '🖥️';
      case 'xuyên không':
        return '🌀';
      case '16+':
        return '🔞';
      default:
        return '❓'; // Default emoji if category not found
    }
  };

   return (
    <div ref={scrollRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:px-20 py-10 px-5">
      {domain.map((category) => (
        <Link to={`/the-loai/${category.slug}`} key={category._id} className="bg-gray-100 p-4 rounded-md shadow-md flex items-center justify-between hover:bg-slate-300 transition duration-300 cursor-pointer">
          <div>
            <h1 className="lg:text-lg font-semibold text-base">{category.name}</h1>
          </div>
          <div className='lg:text-[2em] text-lg'>{getCategoryEmoji(category.name)}</div> {/* Adjust the font size */}
        </Link>
      ))}
    </div>
  );
};

export default Category;