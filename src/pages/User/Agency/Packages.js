import { useContext } from "react";
import "../../../styles/AgencyDashboard/Packages.scss";
import { Context } from "../../../context/SubscriptionContext";
import { useEffect } from "react";
import Loader from "../../../components/Loader";

const Packages = () => {
  const {
    state: { packages, status },
    getAllSubscriptions,
  } = useContext(Context);

  useEffect(() => {
    getAllSubscriptions();
  }, []);

  return (
    <div className="agency-page-myjobs">
      <h3 className="page-title">Packages</h3>
      <div className="card">
        <div className="table-responsive">
          <table className="job-table packages-table">
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Package</th>
                <th>Package Type</th>
                <th>Package Info</th>
                <th>Status</th>
              </tr>
            </thead>
            {status ||
              packages.map((item, index) => (
                <tbody>
                  <tr>
                    <td className="job-table-info">{index + 1}</td>

                    <td className="">4643</td>

                    <td>
                      <div className="packageName">{item.name}</div>
                    </td>

                    <td className="job-table-status nowrap">Job Package</td>

                    <td>
                      <div class="package-info-wrapper">
                        <ul class="lists-info">
                          <li>
                            <span class="title-inner">Posted:</span>
                            <span class="value">
                              {item.allowed_posts - item.remaining_posts}
                            </span>
                          </li>
                          <li>
                            <span class="title-inner">Limit Posts:</span>
                            <span class="value">{item.allowed_posts}</span>
                          </li>
                          <li>
                            <span class="title-inner">Listing Duration:</span>
                            <span class="value">{item.listing_duration}</span>
                          </li>
                        </ul>
                      </div>
                    </td>
                    <td>
                      <span class={"action "+item.status?.toLowerCase()}>{item.status}</span>
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
          {status && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default Packages;
