interface PaginationProps {
  totalProducts: number;
  postPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination = ({
  totalProducts,
  postPerPage,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalProducts / postPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-1 my-8">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`flex h-10 w-10 items-center justify-center rounded-md border transition-colors duration-200 ${
            page === currentPage
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;