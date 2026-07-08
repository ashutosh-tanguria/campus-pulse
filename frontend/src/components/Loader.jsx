import "./Loader.css";

function Loader({ variant = "cards", count = 3 }) {
  if (variant === "spinner") {
    return (
      <div className="loader-spinner-wrap">
        <div className="loader-spinner" />
      </div>
    );
  }

  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card glass-card">
          <div className="skeleton-line skeleton-icon" />
          <div className="skeleton-text">
            <div className="skeleton-line skeleton-title" />
            <div className="skeleton-line skeleton-sub" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Loader;