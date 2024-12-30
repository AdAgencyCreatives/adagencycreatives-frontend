
import React from 'react';

import CreativeContent from "../../components/user/Creative/Content";
import CreativeHeader from "../../components/user/Creative/Header";
import CreativeSidebar from "../../components/user/Creative/Sidebar";

import { useContext, useEffect, useState } from "react";
import Loader from "../../components/Loader";
import RestrictedUser from "../../components/RestrictedUser";

import { Context as CreativesContext } from "../../context/CreativesContext";
import { Context as AuthContext } from "../../context/AuthContext";
import Portfolio from "../../components/user/Creative/Portfolio";
import NotFound from "../../components/NotFound";
import { capitalize } from "@mui/material";

const ViewSearchCreative = ({ page = 'creative', showButtons = false, previewCreative = null }) => {

    const [isLoading, setLoading] = useState(true);

    const {
        state: { single_creative, creative_education, creative_experience },
        getCreative,
    } = useContext(CreativesContext);

    const {
        state: { user, role, token },
    } = useContext(AuthContext);

    const [data, setData] = useState({});

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 90000);
    }, []);

    useEffect(() => {
        if (token) {
            if (page == "creative" && previewCreative) {
                setLoading(true);
                getCreative(previewCreative?.slug, (error) => {
                    if (error) {
                        setLoading(false);
                    }
                });
            }
        }

    }, [page, previewCreative]);

    useEffect(() => {
        if (Object.keys(data)?.length > 0) {
            setLoading(false);
        }
    }, [data]);

    useEffect(() => {
        if (page == "creative" && previewCreative && single_creative && previewCreative.slug == single_creative.slug) {
            setData(single_creative);
        }
    }, [single_creative]);

    const isCreative = user?.role == "creative";
    const isAdmin = user?.role == "admin";
    const isAdvisor = user?.role == "advisor";
    const isAgency = user?.role == "agency";
    const isRecruiter = user?.role == "recruiter";
    const isOwnProfile = user?.uuid == data.user_id;

    useEffect(() => {
        setLoading(true);
        setData({});
    }, []);

    if (isLoading) {
        console.log('loading...');
        return <Loader />;
    }

    return <>
        {Object.keys(data).length === 0 ? (
            <>
                {page == "creative" && !token && !user ? (
                    <RestrictedUser role={page} />
                ) : (
                    <NotFound heading={"Not Found"} content={capitalize(page) + " profile with slug [" + previewCreative?.slug + "] not found."} />
                )}
            </>
        ) : (
            <>
                <div className="profile-header">
                    {page === "creative" ? (
                        <CreativeHeader data={data} role={role} user={user} username={user?.username} showButtons={showButtons} />
                    ) : (<></>)}
                </div>
                <div className="profile-content mt-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-6 col-12">
                                {page == "creative" && <Portfolio portfolio_items={data.portfolio_items} />}
                                {!(data?.role == 'advisor' || data?.role == 'recruiter') && (
                                    <div className="content-section">
                                        <h1 className="content-title mt-0">About</h1>
                                        <p className="content"><div dangerouslySetInnerHTML={{ __html: data.about }} /></p>
                                    </div>
                                )}
                                <div className="profile-sidebar d-md-none">
                                    {page === "creative" ? (
                                        <CreativeSidebar data={data} role={role} user={user} showButtons={showButtons} />
                                    ) : (<></>)}
                                </div>
                                {page === "creative" ? (
                                    <CreativeContent
                                        user={user}
                                        data={data}
                                        role={role}
                                        education={creative_education}
                                        experience={creative_experience}
                                        showButtons={showButtons}
                                    />
                                ) : (<></>)}
                            </div>
                            <div className="col-lg-4 col-md-6 col-12 d-none d-md-block">
                                <div className="profile-sidebar">
                                    {page === "creative" ? (
                                        <CreativeSidebar data={data} role={role} user={user} showButtons={showButtons} />
                                    ) : (<></>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )}
    </>
};

export default ViewSearchCreative;
