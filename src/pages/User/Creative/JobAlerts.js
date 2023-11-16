import { useContext, useEffect, useState } from "react";
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
  const [checked, setChecked] = useState(false);

  const {
    state: { user, token },
  } = useContext(AuthContext);

  useEffect(() => {
    setChecked(job_alerts?.status == "Active" ? true : false);
  }, [job_alerts]);

  useEffect(() => {
    if (user) getJobAlerts(user.uuid);
  }, [user]);
  const handleChange = async (e) => {
    const active = e.target.checked ? 1 : 0;
    await setJobAlert(job_alerts.user_id, job_alerts.category_id, active);
    showAlert(active ? "Notifications enabled" : "Notifications disabled");
  };
  return (
    <div className="agency-page-myjobs">
      <h3 className="page-title">Job Alerts</h3>
      <div className="card">
        {loading ? (
          <Loader />
        ) : (
          <FormGroup>
            <FormControlLabel
              control={<Switch />}
              label="Enable Notifications"
              checked={checked}
              onChange={handleChange}
            />
          </FormGroup>
        )}
      </div>
    </div>
  );
};

export default JobAlerts;
