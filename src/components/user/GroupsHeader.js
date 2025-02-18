import { Link } from "react-router-dom";
import Placeholder from "../../assets/images/placeholder.png";
import { IoLocationOutline, IoMailOpen, IoPeopleOutline, IoPersonAdd } from "react-icons/io5";

import { Context as AuthContext } from "../../context/AuthContext";
import { getCreativeById } from "../../context/CreativesDataContext";
import { useContext, useEffect, useState } from "react";
import CreateGroup from "../community/CreateGroup";
import { HiOutlineUserGroup } from "react-icons/hi2";

const GroupsHeader = ({ currentView, onSave }) => {

    const {
        state: { role, user, token },
    } = useContext(AuthContext);


    useEffect(() => {
        if (user) {
        }
    }, [user]);

    const isCurrentPage = (relativeUrl) => {
        return (window.location.pathname + (window.location.search && window.location.search.length > 1 ? window.location.search : '')) == relativeUrl;
    }

    return (
        <div className="groups-header">
            <div className="post-form">
                <CreateGroup onSave={onSave} />
                <Link className={"btn btn-dark btn-outline" + (!currentView ? ' btn-selected' : '')} to="/groups"><HiOutlineUserGroup /> <span className="m-2">Public Groups</span></Link>
                <Link className={"btn btn-dark btn-outline" + (currentView == 'private' ? ' btn-selected' : '')} to="/groups?view=private"><HiOutlineUserGroup /> <span className="m-2">Private Groups</span></Link>
                <Link className={"btn btn-dark btn-outline" + (currentView == 'my' ? ' btn-selected' : '')} to="/groups?view=my"><HiOutlineUserGroup /> <span className="m-2">My Groups</span></Link>
                <Link className={"btn btn-dark btn-outline" + (currentView == 'joined' ? ' btn-selected' : '')} to="/groups?view=joined"><HiOutlineUserGroup /> <span className="m-2">Joined Groups</span></Link>
            </div>
        </div>
    );
};

export default GroupsHeader;
