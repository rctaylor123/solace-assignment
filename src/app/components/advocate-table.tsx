import { useEffect, useState } from 'react';
import axios from 'axios';

import SearchBar from '@/app/components/search-bar';
import DataTable from '@/app/components/data-table';
import Pagination from '@/app/components/pagination';
import { Advocate } from '@/app/types/advocate';

export default function AdvocateTable() {
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalAdvocates, setTotalAdvocates] = useState(0);
  const [pageSize] = useState(5);
  
  useEffect(() => {
    const debounce = setTimeout(() => {
      setCurrentPage(1); // Reset to the first page when searching
      filterAdvocates(searchText, 1);
    }, 500);
    return () => {
      clearTimeout(debounce);
    };
  }, [searchText]);

  const filterAdvocates = (search: string, page: number) => {
    setIsLoading(true);
    axios
      .get('/api/advocates', {
        params: {
          search: search,
          page: page,
          pageSize: pageSize
        }
      })
      .then((response) => {
        setFilteredAdvocates(response.data.advocates);
        setTotalAdvocates(response.data.totalCount);
      })
      .catch((error) => {
        console.error('Error fetching advocates:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSearchChange = (search: string) => {
    setSearchText(search);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    filterAdvocates(searchText, page);
  };

  return (
    <div className='mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14'>
      <div className='flex flex-col'>
        <div className='-m-1.5 overflow-x-auto'>
          <div className='inline-block min-w-full p-1.5 align-middle'>
            <div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xs'>
              {/* Header */}
              <div className='grid gap-3 border-b border-gray-200 px-6 py-4 md:flex md:items-center md:justify-between'>
                <div>
                  <h2 className='text-xl font-semibold text-green-800'>Solace Advocates</h2>
                </div>

                <div>
                  <div className='inline-flex gap-x-2'>
                    <div className='max-w-sm space-y-3'>
                      <SearchBar searchText={searchText} handleSearch={handleSearchChange} />
                    </div>
                  </div>
                </div>
              </div>
              {/* End Header */}
              <DataTable filteredAdvocates={filteredAdvocates} isLoading={isLoading} />
              {!isLoading && totalAdvocates > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(totalAdvocates / pageSize)}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
