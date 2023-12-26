import { useContext, useEffect } from "react";
import { Context as JobsContext } from "../../../context/JobsContext";
import { Context as AuthContext } from "../../../context/AuthContext";
import { Context as AlertContext } from "../../../context/AlertContext";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import Loader from "../../../components/Loader";

const JobAlerts = () => {

  const {
    state: { job_alerts, loading },
    getJobAlerts,
    setJobAlert,
  } = useContext(JobsContext);

  const { showAlert } = useContext(AlertContext);

  const {
    state: { user },
  } = useContext(AuthContext);

  const handleChange = async (e, item) => {
    const active = e.target.checked ? 1 : 0;
    await setJobAlert(item.uuid, item.user_id, item.category_id, active);
    showAlert(active ? "Notifications enabled" : "Notifications disabled");
  };

  useEffect(() => {
    if (user) getJobAlerts(user.uuid);
  }, [user]);

  return (
    <div className="agency-page-myjobs">
      <h3 className="page-title">Job Alerts</h3>
      <div className="card">
        {loading ? (
          <Loader />
        ) : (
          job_alerts && job_alerts?.map((item) => {
            return (
              <FormGroup key={item.uuid}>
                <FormControlLabel
                  control={<Switch />}
                  label={item.category}
                  checked={item.status === "Active" ? true : false}
                  onChange={(e) => handleChange(e, item)}
                />
              </FormGroup>
            )
          })
        )}
      </div>
    </div>
  );
};

export default JobAlerts;
