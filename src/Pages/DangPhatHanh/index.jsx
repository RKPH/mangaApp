import axios from 'axios';
import { useEffect, useState ,useRef} from 'react';


import { Link ,useLocation  } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

const DangPhatHanh = () => {
  const scrollRef = useRef(null);
  const [data, setData] = useState([]);
  const [domain, setDomain] = useState("https://otruyenapi.com/uploads/comics/");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const query = useQuery();
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const page = Number(query.get('page')) || 1;
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    
    
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  useEffect(() => {
   
    setCurrentPage(page);
  
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://otruyenapi.com/v1/api/danh-sach/dang-phat-hanh?page=${page}`);
        setData(response.data.data.items);
        setTotalPages(Math.ceil(response.data.data.params.pagination.totalItems / response.data.data.params.pagination.totalItemsPerPage));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [currentPage]);
  
  const formatUpdatedAt = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div ref={scrollRef} className="w-full  min-h-screen px-10 ">
      <div  className='h-full w-full py-2'>
      <h1 className='text-lg lg:text-3xl text-orange-500 text-center mb-5'>{ page === 1 ? "TRUYỆN TRANH ĐANG PHÁT HÀNH" :`TRUYỆN TRANH ĐANG PHÁT HÀNH TRANG ${page}`}</h1>
        
        {data.map((item) => (
          <div key={item._id} className='w-full h-[100px] p-1 bg-[whitesmoke] border-2  rounded-md cursor-pointer grid grid-cols-12  mb-4 items-center hover:shadow-xl hover:bg-slate-300 transition duration-300'>
            <div className='col-span-10 lg:col-span-8  gap-4 ml-1 flex '>
              <img className='w-[70px] h-[80px] rounded-md shadow-md' src={`${domain}/${item.thumb_url} `} loading='lazy' alt={item.slug} />
              <span className='overflow-hidden overflow-ellipsis whitespace-nowrap'>
                <h4 className='text-lg lg:text-xl text-black font-semibold'>{item.name}</h4>
                <h5 className='text-sm lg:text-lg text-gray-500 font-normal'>{item.origin_name}</h5>
                <h6 className="block lg:hidden"><span className="rounded-lg bg-gradient-to-br from-sky-400 to-blue-700 text-sm px-1">Chapter:{" "}
                {item.chaptersLatest && item.chaptersLatest[0]
                  ? item.chaptersLatest[0].chapter_name
                  : "Loading..."}</span></h6>
              </span>
            </div>
            <span className='col-span-2 lg:block rounded-2xl text-right hiden'>
              <span className='bg-blue-200 p-2  lg:inline hidden rounded-lg text-white w-40 bg-gradient-to-br from-sky-400 to-blue-700'>Chapter:{" "}
                {item.chaptersLatest && item.chaptersLatest[0]
                  ? item.chaptersLatest[0].chapter_name
                  : "Loading..."}</span>
            </span>
            <span className='col-span-2 lg:block hidden text-base font-mono text-center false'>
             {formatUpdatedAt(item.updatedAt)}
            </span>
          </div>
        ))}
        <Pagination
          className='flex items-end justify-end'
          color='primary'
          shape='rounded'
          onChange={handlePageChange}
          page={currentPage}
          count={totalPages}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`/danh-sach/dang-phat-hanh?page=${item.page}`}
              {...item}
            />
          )}
        />
      </div>
    </div>
  );
};

export default DangPhatHanh;
