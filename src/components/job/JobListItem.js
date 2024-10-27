import { IoBriefcaseOutline, IoLocationOutline, IoStar } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Tooltip from "../../components/Tooltip";
import moment from "moment";
import { CircularProgress } from "@mui/material";
import AgencyImageLoader from "../AgencyImageLoader";
import ViewCreativeProfile from "../../pages/User/ViewCreativeProfile";
import CommonModal from "../modals/CommonModal";
import { useState } from "react";

const JobListItem = ({
    item,
    showAgency = true,
    user,
    role,
    rectify_url,
    isLoading,
    isCreative,
    showAlert,
    setJob,
    handleApplyExternalJob,
    setOpen
}) => {

    const [openApplyNow, setOpenApplyNow] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="job-item" key={item.id}>
            <div className="d-flex align-items-center flex-md-nowrap flex-wrap gap-md-0 gap-3">
                <div className="inner-left">
                    <div className="employer-logo">
                        <Link to={"/job/" + item.slug}>
                            <AgencyImageLoader agency={item.agency} height={50} width={50} />
                        </Link>
                    </div>
                    <div className="meta row w-100 align-items-center">
                        <div className="job-list-content col-md-8">
                            <div className="title-wrapper flex-middle-sm">
                                {showAgency && (
                                    <h5 className="employer-name mb-0">
                                        {role == 'admin' || item?.agency?.role == "agency" ? (
                                            <Link
                                                className="link-dark"
                                                to={role == 'admin' ? (rectify_url(item?.agency?.website) || ("/agency/" + item.agency.slug)) : ("/agency/" + item.agency.slug)}
                                                target={role == 'admin' ? "_blank" : ""}
                                            >
                                                {item.agency.name}
                                            </Link>
                                        ) : (<>
                                            {item.agency.name}
                                        </>)}
                                    </h5>
                                )}
                                <h2 className="job-title">
                                    <Link to={"/job/" + item.slug}>{item.title}</Link>
                                </h2>
                            </div>
                            <div className="job-metas">
                                <div className="d-flex flex-wrap">
                                    {item.category && (
                                        <div className="category-job">
                                            <div className="job-category with-icon">
                                                <IoBriefcaseOutline />
                                                <Link
                                                    to={
                                                        "/job-category/" +
                                                        item.category.toLowerCase().replace(/ /g, "-")
                                                    }
                                                    reloadDocument
                                                >
                                                    {item.category}
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                    {item.location.state && (
                                        <div className="job-location location">
                                            {(item?.location?.state?.length || item?.location?.city?.length) && (<IoLocationOutline />)}
                                            <Link to={`/job-location-state/${item.location.state}`}>
                                                {item.location.state}
                                            </Link>
                                            {(item?.location?.state?.length && item?.location?.city?.length) && (<span>,&nbsp;</span>)}
                                            <Link to={`/job-location-city/${item.location.city}`}>
                                                {item.location.city}
                                            </Link>
                                        </div>
                                    )}
                                    <div className="job-deadline with-icon">
                                        <i className="flaticon-wall-clock"></i>
                                        {moment(item.expired_at).format("MMMM D, YYYY")}
                                    </div>
                                </div>
                                <div>
                                    <div className="job-type with-title">
                                        <Link
                                            className="type-job"
                                            to={"/job-type/" + item.employment_type.toLowerCase()}
                                            reloadDocument
                                        >
                                            {item.employment_type}
                                        </Link>
                                    </div>
                                    {Object.keys(item.priority).map((key) => {
                                        if (item.priority[key]) {
                                            let parts = key.split("_");
                                            let type = parts[1];
                                            return (
                                                <Tooltip title={type} type={type} key={key}>
                                                    <span className="p-0 border-0 me-2">
                                                        <IoStar
                                                            size={20}
                                                            className={"icon-rounded star-badge " + type}
                                                        />
                                                    </span>
                                                </Tooltip>
                                            );
                                        }
                                    })}
                                    {Object.keys(item.workplace_preference).map((key) => {
                                        if (item.workplace_preference[key]) {
                                            let parts = key.split("_");
                                            let type = parts[1];
                                            return (
                                                <Tooltip title={type} type={type} key={key}>
                                                    <span className="p-0 border-0 me-2">
                                                        <IoStar
                                                            size={20}
                                                            className={"icon-rounded star-badge " + type}
                                                        />
                                                    </span>
                                                </Tooltip>
                                            );
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="d-flex justify-content-md-end mt-3 mt-md-0">
                                {/* <a className="btn-follow btn-action-job btn-add-job-shortlist">
                      <i className="flaticon-bookmark"></i>
                    </a> */}

                                {item.logged_in_user?.user_has_applied ? (
                                    <Tooltip title={item.apply_type.toLowerCase() == "external" ? "" : "Already Applied"}>
                                        {item.apply_type.toLowerCase() == "external" ? (
                                            <Link
                                                to={item.apply_type.toLowerCase() == "external" ? rectify_url(item.external_link) : ""}
                                                target={item.apply_type.toLowerCase() == "external" ? "_blank" : ""}
                                                className={"btn btn-apply active external"}
                                            >
                                                Interested
                                            </Link>
                                        ) : (
                                            <div className={"btn btn-apply active internal"}>
                                                Applied
                                            </div>
                                        )}
                                    </Tooltip>
                                ) : (
                                    <>
                                        {isLoading && (<CircularProgress />)}
                                        {user?.role?.length > 0 && user?.role == "creative" ? (
                                            <Tooltip type="featured"
                                            // title={<div className="no-transform" style={{ whiteSpace: 'pre-line', color: '#000000' }}>{"Before applying we recommend" + "\n" + "you review your resume details" + "\n" + "Job Dashboard > My Resume"}</div>}
                                            >
                                                <Link
                                                    to={
                                                        item.apply_type.toLowerCase() == "external"
                                                            ? item.external_link
                                                            : ""
                                                    }
                                                    target={item.apply_type.toLowerCase() == "external" ? "_blank" : ""}
                                                    className="btn btn-apply btn-apply-job-external "
                                                    onClick={(e) => {
                                                        if (!isCreative) {
                                                            showAlert("Login as a Creative to apply");
                                                            e.preventDefault();
                                                        } else if (item.apply_type.toLowerCase() == "internal") {
                                                            e.preventDefault();
                                                            setOpenApplyNow(true);
                                                        } else if (item.apply_type.toLowerCase() == "external") {
                                                            handleApplyExternalJob(item);
                                                        }
                                                    }}
                                                >
                                                    Apply Now
                                                    <i className="next flaticon-right-arrow"></i>
                                                </Link>
                                                {item.apply_type.toLowerCase() == "internal" && (
                                                    <CommonModal
                                                        dialogTitle="Review Your Profile"
                                                        dialogTitleStyle={{ textAlign: 'center' }}
                                                        open={openApplyNow}
                                                        setOpen={setOpenApplyNow}
                                                        onClose={() => { }}
                                                        actions={[
                                                            {
                                                                buttonText: "Apply", buttonAction: (e) => {
                                                                    setJob(item.id);
                                                                    setOpen(true);
                                                                }, invokeOnClose: true,
                                                            },
                                                            {
                                                                buttonText: "Revise", buttonAction: (e) => {
                                                                    navigate("/my-resume");
                                                                }
                                                            }
                                                        ]}
                                                        actionsClassName="common-modal-actions-apply-now"
                                                    >
                                                        <ViewCreativeProfile />
                                                    </CommonModal>
                                                )}
                                            </Tooltip>
                                        ) : (
                                            <Link
                                                to={
                                                    item.apply_type.toLowerCase() == "external"
                                                        ? item.external_link
                                                        : ""
                                                }
                                                target={item.apply_type.toLowerCase() == "external" ? "_blank" : ""}
                                                className="btn btn-apply btn-apply-job-external "
                                                onClick={(e) => {
                                                    if (!isCreative) {
                                                        showAlert("Login as a Creative to apply");
                                                        e.preventDefault();
                                                    }
                                                }}
                                            >
                                                Apply Now
                                                <i className="next flaticon-right-arrow"></i>
                                            </Link>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobListItem;
