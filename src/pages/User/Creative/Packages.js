import "../../../styles/AgencyDashboard/Packages.scss";

const Packages = () => {
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
            <tbody>
              <tr>
                <td className="job-table-info">1</td>

                <td className="">4643</td>

                <td>
                  <div className="packageName">Multiple Creative Jobs </div>
                </td>

                <td className="job-table-status nowrap">Job Package</td>

                <td>
                  <div class="package-info-wrapper">
                    <ul class="lists-info">
                      <li>
                        <span class="title-inner">Urgent:</span>
                        <span class="value">Yes </span>
                      </li>
                      <li>
                        <span class="title-inner">Featured:</span>
                        <span class="value">No </span>
                      </li>
                      <li>
                        <span class="title-inner">Posted:</span>
                        <span class="value">2</span>
                      </li>
                      <li>
                        <span class="title-inner">Limit Posts:</span>
                        <span class="value">3</span>
                      </li>
                      <li>
                        <span class="title-inner">Listing Duration:</span>
                        <span class="value">45</span>
                      </li>
                    </ul>
                  </div>
                </td>
                <td>
                  <span class="action active">Active</span>
                </td>
              </tr>
              <tr>
                <td className="job-table-info">1</td>

                <td className="">4643</td>

                <td>
                  <div className="packageName">Multiple Creative Jobs </div>
                </td>

                <td className="job-table-status nowrap">Job Package</td>

                <td>
                  <div class="package-info-wrapper">
                    <ul class="lists-info">
                      <li>
                        <span class="title-inner">Urgent:</span>
                        <span class="value">Yes </span>
                      </li>
                      <li>
                        <span class="title-inner">Featured:</span>
                        <span class="value">No </span>
                      </li>
                      <li>
                        <span class="title-inner">Posted:</span>
                        <span class="value">2</span>
                      </li>
                      <li>
                        <span class="title-inner">Limit Posts:</span>
                        <span class="value">3</span>
                      </li>
                      <li>
                        <span class="title-inner">Listing Duration:</span>
                        <span class="value">45</span>
                      </li>
                    </ul>
                  </div>
                </td>
                <td>
                  <span class="action active">Active</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Packages;
