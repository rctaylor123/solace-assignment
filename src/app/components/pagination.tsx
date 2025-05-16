interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
    return (
        <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200">
            <div>
                <nav className="flex items-center gap-x-1">
                    <button
                        type="button"
                        disabled={currentPage == 1}
                        className="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                        onClick={() => onPageChange(currentPage - 1)}
                    >
                        <span>Previous</span>
                    </button>
                    <div className="flex items-center gap-x-1">
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
                        type="button"
                        disabled={currentPage == totalPages}
                        className="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
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
            type="button"
            className={`min-h-9.5 min-w-9.5 flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none ${isActive ? 'bg-gray-200' : ''}`}
            onClick={onClick}
        >
            {page}
        </button>
    );
}