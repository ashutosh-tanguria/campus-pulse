import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import "./FeaturedEvent.css";

function getCountdown(dateStr) {
  const diff = new Date(dateStr).getTime() - Date.now();
  if (diff <= 0) return { text: "Started", expired: true };

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (days >= 1) {
    return { value: days, unit: days === 1 ? "Day" : "Days" };
  }
  return { value: hours, unit: hours === 1 ? "Hour" : "Hours" };
}

function FeaturedEvent({ event }) {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(() => getCountdown(event.date));

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown(event.date));
    }, 60000);
    return () => clearInterval(timer);
  }, [event.date]);

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
    <div className="featured-event glass-card">
      <span className="featured-badge">Featured Event</span>

      <div className="featured-content">
        <div className="featured-text">
          <h2>{event.title}</h2>
          <p>{event.tagline}</p>

          <div className="featured-meta">
            <span>
              <Calendar size={14} /> {dateFormatted} · {timeFormatted}
            </span>
            <span>
              <MapPin size={14} /> {event.venue}
            </span>
          </div>

          <button
            className="featured-cta"
            onClick={() => navigate(`/events/${event.id}`)}
          >
            Register Now <ArrowUpRight size={16} />
          </button>
        </div>

        {!countdown.expired && (
          <div className="countdown-ring">
            <span className="countdown-label">Starts in</span>
            <strong>{countdown.value}</strong>
            <span className="countdown-unit">{countdown.unit}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default FeaturedEvent;