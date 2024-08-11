import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const Notification = () => {
  const [notification, contextDispatch] = useContext(NotificationContext);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{notification}</div>;
};

export default Notification;
