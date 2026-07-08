import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Bookmark, BookmarkCheck } from "lucide-react";
import "./NoticeCard.css";

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function NoticeCard({ notice, bookmarked, onToggleBookmark }) {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  return (
    <div
      className="notice-card glass-card"
      onClick={() => navigate(`/notices/${notice.id}`)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="notice-icon">
        <FileText size={18} />
      </div>
      <div className="notice-info">
        <h4>{notice.title}</h4>
        <span>
          {notice.category} · {timeAgo(notice.postedDate)}
        </span>
      </div>
      <button
        className="bookmark-btn"
        onClick={(e) => {
          e.stopPropagation();
          onToggleBookmark(notice.id);
        }}
        aria-label="Bookmark"
      >
        {bookmarked ? (
          <BookmarkCheck size={18} className="bookmarked" />
        ) : (
          <Bookmark size={18} />
        )}
      </button>
    </div>
  );
}

export default NoticeCard;