import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';

const Home = () => {
  const [data, setData] = useState([]);
  const [domain, setDomain] = useState("https://otruyenapi.com/uploads/comics/");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://otruyenapi.com/v1/api/danh-sach/truyen-moi?page=${currentPage}`);
        setData(response.data.data.items);
        setTotalPages(Math.ceil(response.data.data.params.pagination.totalItems / response.data.data.params.pagination.totalItemsPerPage));
        console.log(totalPages)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    window.history.pushState({}, '', `http://localhost:5173/danh-sach/truyen-moi?page=${page}`);

  };
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
    <div className="w-full min-h-screen px-10">
      <div className='h-full w-full py-2'>
        <h1 className='text-lg lg:text-3xl text-orange-500 text-center mb-5'>TRUYEN TRANH MỚI CẬP NHẬT MỖI NGÀY</h1>
        
        {data.map((item) => (
          <div key={item._id} className='w-full h-[100px] p-1 bg-[whitesmoke] border-2  rounded-md cursor-pointer grid grid-cols-12  mb-4 items-center hover:shadow-xl hover:bg-slate-300 transition duration-300'>
            <div className='col-span-8 gap-4 ml-1 flex '>
              <img className='w-[70px] h-[80px] rounded-md shadow-md' src={`${domain}/${item.thumb_url} `} loading='lazy' alt={item.slug} />
              <span className='overflow-hidden overflow-ellipsis whitespace-nowrap'>
                <h4 className='text-lg lg:text-xl text-black font-semibold'>{item.name}</h4>
                <h5 className='text-sm lg:text-lg text-gray-500 font-normal'>{item.origin_name}</h5>
              </span>
            </div>
            <span className='col-span-2 block rounded-2xl text-right '>
              <span className='bg-blue-200 p-2 rounded-lg w-40 bg-gradient-to-tr from-sky-500 to-indigo-500'>Chapter: {item.chaptersLatest[0].chapter_name}</span>
            </span>
            <span className='col-span-2 block text-base font-mono text-center false'>
             {formatUpdatedAt(item.updatedAt)}
            </span>
          </div>
        ))}
      </div>
      <Stack className='flex items-center' spacing={2} sx={{display:'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Pagination variant="outlined" shape="square" count={totalPages} page={currentPage} onChange={handlePageChange}  key={currentPage}  />
      </Stack>
    </div>
  );
};

export default Home;
