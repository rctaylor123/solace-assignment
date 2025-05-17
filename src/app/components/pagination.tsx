interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  return (
    <div className='grid gap-3 border-t border-gray-200 px-6 py-4 md:flex md:items-center md:justify-between'>
      <div>
        <nav className='flex items-center gap-x-1'>
          <button
            type='button'
            disabled={currentPage == 1}
            className='inline-flex min-h-9.5 min-w-9.5 items-center justify-center gap-x-1.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50'
            onClick={() => onPageChange(currentPage - 1)}
          >
            <span>Previous</span>
          </button>
          <div className='flex items-center gap-x-1'>
            {Array.from({ length: totalPages }, (_, index) => (
              <PageNumberButton
                key={index}
                page={index + 1}
                isActive={currentPage === index + 1}
                onClick={() => onPageChange(index + 1)}
              />
            ))}
          </div>
          <button
            type='button'
            disabled={currentPage == totalPages}
            className='inline-flex min-h-9.5 min-w-9.5 items-center justify-center gap-x-1.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50'
            onClick={() => onPageChange(currentPage + 1)}
          >
            <span>Next</span>
          </button>
        </nav>
      </div>
    </div>
  );
}

function PageNumberButton({ page, isActive, onClick }: { page: number; isActive: boolean; onClick: () => void }) {
  return (
    <button
      type='button'
      className={`flex min-h-9.5 min-w-9.5 items-center justify-center rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 ${isActive ? 'bg-gray-200' : ''}`}
      onClick={onClick}
    >
      {page}
    </button>
  );
}
