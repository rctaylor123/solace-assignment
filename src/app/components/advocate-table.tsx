import { useEffect, useState } from 'react';
import SearchBar from '@/app/components/search-bar';
import DataTable from '@/app/components/data-table';
import Pagination from '@/app/components/pagination';
import { Advocate } from '@/app/types/advocate';

export default function AdvocateTable() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    console.log('fetching advocates...');
    fetch('/api/advocates').then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const filterAdvocates = (search: string) => {
    setSearchText(search);

    if (!search) {
      setFilteredAdvocates(advocates);
      return;
    }

    console.log('filtering advocates... ' + search);
    const filteredAdvocates = advocates.filter((advocate: Advocate) => {
      return (
        advocate.firstName.includes(search) ||
        advocate.lastName.includes(search) ||
        advocate.city.includes(search) ||
        advocate.degree.includes(search) ||
        advocate.specialties.includes(search) ||
        advocate.yearsOfExperience.toString().includes(search)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const clearFilter = () => {
    setSearchText('');
    setFilteredAdvocates(advocates);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
                      <SearchBar
                        searchText={searchText}
                        handleSearch={filterAdvocates}
                        handleClearFilter={clearFilter}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* End Header */}
              <DataTable filteredAdvocates={filteredAdvocates} isLoading={false} />
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredAdvocates.length / 10)}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
