interface PaginationProps {
  page: number;
  totalResults: number;
  onPrevious: () => void;
  onNext: () => void;
}

function Pagination({ page, totalResults, onPrevious, onNext }: PaginationProps) {
  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="pagination">
      <button disabled={page <= 1} onClick={onPrevious}>Previous</button>
      <span>Page {page} of {totalPages}</span>
      <button disabled={page >= totalPages} onClick={onNext}>Next</button>
    </div>
  );
}

export default Pagination;
