// const Notification = ({ type, message }) => {
//     if (message === null) {
//       return null;
//     }
//     return (<div
//       className={type === "errmessage" ? "errmessage" : "notification"} > {message}
//     </div>)
// }

// export default Notification;

import { useSelector } from "react-redux";
import { Alert } from "@mui/material";
const Notification = () => {
  const notification = useSelector((state) => state.notifications);

  const style = {
    border: "solid",
    padding: 10,
    boderWidth: 1,
  };
  if (notification === null) {
    return null;
  }
  return (
    <div>
      <Alert severity="success">{notification}</Alert>
    </div>
  );
};

export default Notification;
