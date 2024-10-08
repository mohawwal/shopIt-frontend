import { useContext } from "react";
import AlertContext from "./AlertContext";

const alertStyles = {
    position: 'fixed',
    top: 0,
    right: 0,
    margin: '20px',
    zIndex: "999",
    padding: "16px",
    borderRadius: "6px",
    fontSize: "0.9rem",
    fontWeight: 400,
    width: "80%",
    maxWidth: "300px",
};


const severityStyles = {
    success: {
      color: "#0f5132",
      background: "#d1e7dd",
    },
    info: {
      color: "#055160",
      background: "90ddee",
    },
    warning: {
      color: "#664d03",
      background: "fff3cd",
    },
    error: {
      color: "#842029",
      background: "#f8d7da",
    },
};

const Alert = () => {
    const [alert] =useContext(AlertContext)

    if(!alert) {
        return null;
    }
    const fullStyles = {
        ...alertStyles,
        ...severityStyles[alert.type],
    }

    return <div style={fullStyles}>{alert.message}</div>
}

export default Alert