interface LoaderProps {
  count?: number;
  variant?: 'card' | 'detail';
}

function Loader({ count = 1, variant = 'card' }: LoaderProps) {
  if (variant === 'detail') {
    return (
      <div className="movie detail loading" aria-hidden="true">
        <div className="poster shimmer"></div>
        <div className="movie-data">
          <div className="shimmer skeleton-title"></div>
          <p className="shimmer meta-line-skeleton"></p>
          <div className="genre-pills">
            <span className="pill shimmer"></span>
            <span className="pill shimmer"></span>
            <span className="pill shimmer"></span>
          </div>
          <p className="shimmer plot-skeleton"></p>
          <p className="shimmer detail-line-skeleton"></p>
          <p className="shimmer detail-line-skeleton"></p>
        </div>
      </div>
    );
  }

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div className="movie loading" key={i} aria-hidden="true">
          <div className="poster shimmer"></div>
          <div className="movie-data">
            <div className="shimmer skeleton-title"></div>
            <div className="movie-details">
              <p className="shimmer"></p>
              <p className="shimmer"></p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Loader;
