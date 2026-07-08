import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Calendar, User } from "lucide-react";
import { useFetch } from "../hooks/useFetch";
import { fetchNoticeById } from "../api/api";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";

function NoticeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: notice, loading, error } = useFetch(
    () => fetchNoticeById(id),
    [id]
  );

  if (loading) return <Loader variant="spinner" />;
  if (error) return <ErrorState message={error} />;
  if (!notice) return null;

  const dateFormatted = new Date(notice.postedDate).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 20,
          color: "var(--text-secondary)",
          fontSize: 14,
        }}
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="glass-card" style={{ padding: 32, maxWidth: 760 }}>
        <span
          style={{
            display: "inline-block",
            padding: "6px 14px",
            borderRadius: 999,
            background: "var(--gradient-primary)",
            color: "#fff",
            fontSize: 12,
            fontWeight: 600,
            marginBottom: 16,
          }}
        >
          {notice.category}
        </span>

        <h1 style={{ fontSize: 28, marginBottom: 16 }}>{notice.title}</h1>

        <div style={{ display: "flex", gap: 20, marginBottom: 24, color: "var(--text-muted)", fontSize: 13, flexWrap: "wrap" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <User size={14} /> {notice.author}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Calendar size={14} /> {dateFormatted}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <FileText size={14} /> Notice
          </span>
        </div>

        <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: 15 }}>
          {notice.content}
        </p>
      </div>
    </div>
  );
}

export default NoticeDetail;