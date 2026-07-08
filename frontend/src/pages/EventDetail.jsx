import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { useFetch } from "../hooks/useFetch";
import { fetchEventById } from "../api/api";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";

function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: event, loading, error } = useFetch(
    () => fetchEventById(id),
    [id]
  );

  if (loading) return <Loader variant="spinner" />;
  if (error) return <ErrorState message={error} />;
  if (!event) return null;

  const dateFormatted = new Date(event.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const timeFormatted = new Date(event.date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
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

      <div className="glass-card" style={{ maxWidth: 760, overflow: "hidden" }}>
        <div
          style={{
            height: 220,
            background: "var(--gradient-card)",
            position: "relative",
          }}
        />

        <div style={{ padding: 32 }}>
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
            {event.category}
          </span>

          <h1 style={{ fontSize: 28, marginBottom: 8 }}>{event.title}</h1>
          <p style={{ color: "var(--text-secondary)", marginBottom: 20 }}>{event.tagline}</p>

          <div style={{ display: "flex", gap: 20, marginBottom: 24, color: "var(--text-muted)", fontSize: 13, flexWrap: "wrap" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Calendar size={14} /> {dateFormatted} · {timeFormatted}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <MapPin size={14} /> {event.venue}
            </span>
          </div>

          <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: 15, marginBottom: 28 }}>
            {event.description}
          </p>

          <button
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "var(--gradient-primary)",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              padding: "12px 22px",
              borderRadius: "var(--radius-sm)",
              boxShadow: "var(--shadow-glow)",
            }}
          >
            Register Now <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;