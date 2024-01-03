import { useContext, useEffect } from "react";
import { Context as CreativesContext } from "../../context/CreativesContext";
import TimeAgo from "../TimeAgo";
import { IoTimeOutline } from "react-icons/io5";
import moment from "moment";

const Notifications = ({ creative, type }) => {
  const {
    state: { notifications },
    getNotifications,
  } = useContext(CreativesContext);

  useEffect(() => {
    getNotifications(creative.uuid, type);
  }, []);

  return (
    <div className="card notifications">
      <div className="card-title mb-2">Notifications</div>
      {notifications.map((item) => {
        return (
          <div className="item border-bottom py-2">
            <p className="mb-0">{item.message}</p>
            <div style={{ fontSize: '12px', color: '#858585', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <IoTimeOutline />
              <TimeAgo datetime={item.created_at} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
 
export default Notifications;