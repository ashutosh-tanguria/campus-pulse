import "./StatsCard.css";

function StatsCard({ icon: Icon, value, label, sublabel, color }) {
  return (
    <div className="stats-card glass-card">
      <div className={`stats-icon stats-icon-${color}`}>
        <Icon size={20} />
      </div>
      <div className="stats-info">
        <h3>{value}</h3>
        <p>{label}</p>
        {sublabel && <span>{sublabel}</span>}
      </div>
    </div>
  );
}

export default StatsCard;