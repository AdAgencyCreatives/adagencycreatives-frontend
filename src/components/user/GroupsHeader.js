import { Link } from "react-router-dom";
import Placeholder from "../../assets/images/placeholder.png";
import { IoLocationOutline, IoMailOpen, IoPeopleOutline, IoPersonAdd } from "react-icons/io5";

import { Context as AuthContext } from "../../context/AuthContext";
import { getCreativeById } from "../../context/CreativesDataContext";
import { useContext, useEffect, useState } from "react";
import CreateGroup from "../community/CreateGroup";
import { HiOutlineUserGroup } from "react-icons/hi2";

const GroupsHeader = ({ username }) => {

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
                <CreateGroup />
                <Link className={"btn btn-dark btn-outline" + (isCurrentPage('/groups') ? ' btn-selected' : '')} to="/groups"><HiOutlineUserGroup /> Public Groups</Link>
                <Link className={"btn btn-dark btn-outline" + (isCurrentPage('/groups?view=my') ? ' btn-selected' : '')} to="/groups?view=my"><HiOutlineUserGroup /> My Groups</Link>
                <Link className={"btn btn-dark btn-outline" + (isCurrentPage('/groups?view=joined') ? ' btn-selected' : '')} to="/groups?view=joined"><HiOutlineUserGroup /> Joined Groups</Link>
            </div>
        </div>
    );
};

export default GroupsHeader;
