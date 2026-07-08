import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import "./EventCard.css";

function formatDateParts(dateStr) {
  const d = new Date(dateStr);
  const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = d.getDate();
  const time = d.toLocaleString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  return { month, day, time };
}

function EventCard({ event }) {
  const navigate = useNavigate();
  const { month, day, time } = formatDateParts(event.date);

  return (
    <div
      className="event-card glass-card"
      onClick={() => navigate(`/events/${event.id}`)}
    >
      <div className="event-image">
        <div className="event-date-badge">
          <span>{month}</span>
          <strong>{day}</strong>
        </div>
      </div>
      <div className="event-info">
        <h4>{event.title}</h4>
        <p className="event-category">{event.category}</p>
        <div className="event-meta">
          <span>{time}</span>
          <span className="dot">·</span>
          <span className="event-venue">
            <MapPin size={12} /> {event.venue}
          </span>
        </div>
      </div>
    </div>
  );
}

export default EventCard;