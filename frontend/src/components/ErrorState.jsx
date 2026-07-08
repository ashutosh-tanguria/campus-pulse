import { AlertTriangle } from "lucide-react";
import "./Loader.css";

function ErrorState({ message = "Something went wrong. Please try again." }) {
  return (
    <div className="state-message">
      <AlertTriangle size={40} />
      <h3>Unable to load data</h3>
      <p>{message}</p>
    </div>
  );
}

export default ErrorState;