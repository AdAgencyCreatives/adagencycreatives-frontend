import { useContext, useEffect, useState } from "react";
import { Context as JobsContext } from "../../../context/JobsContext";
import { Context as DataContext } from "../../../context/DataContext";
import { Context as AuthContext } from "../../../context/AuthContext";
import { Context as AlertContext } from "../../../context/AlertContext";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import Loader from "../../../components/Loader";
import { getConfig } from "@testing-library/react";

const JobAlerts = () => {

  const [data, setData] = useState([]);

  const {
    state: { job_alerts, loading },
    getJobAlerts,
    setJobAlert,
  } = useContext(JobsContext);

  const {
    state: { categories, },
    getCategories,
  } = useContext(DataContext);

  const { showAlert } = useContext(AlertContext);

  const {
    state: { user },
  } = useContext(AuthContext);

  const handleChange = async (e, item) => {
    const active = e.target.checked ? 1 : 0;
    await setJobAlert(user.uuid, item.category.id, active, async (responseData) => {
      handleResponseData(responseData);
    });
    showAlert(active ? "Notifications enabled" : "Notifications disabled");
  };

  const handleResponseData = async (responseData) => {
    await getCategories((cats) => {
      let jaData = [];
      let key = 0;
      cats.forEach(element => {
        let status = responseData.filter(item => {
          return item.user_id == user.uuid && item.category_id == element.id && item.status == 'Active';
        })?.length == 1 ? "Active" : "Not Active";
        jaData.push({ "key": "ja-" + (++key), "category": element, "status": status });
      });
      setData(jaData);
    });
  };

  useEffect(() => {
    if (user) getJobAlerts(user.uuid, async (responseData) => {
      handleResponseData(responseData);
    });
  }, [user]);

  return (
    <div className="agency-page-myjobs">
      <h3 className="page-title">Job Alerts</h3>
      <div className="card">
        {loading ? (
          <Loader />
        ) : (
          data?.length > 0 && data?.map((item) => {
            return (
              <FormGroup key={item.key}>
                <FormControlLabel
                  control={<Switch />}
                  label={item?.category?.name}
                  checked={item?.status === "Active" ? true : false}
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
