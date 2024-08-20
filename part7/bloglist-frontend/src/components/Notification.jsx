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
const Notification = () => {
  const notification = useSelector((state) => state.notifications);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  if (notification === null) {
    return null;
  }
  return <div style={style}>{notification}</div>;
};

export default Notification;
