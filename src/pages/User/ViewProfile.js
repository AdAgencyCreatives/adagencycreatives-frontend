
import React from 'react';

import CreativeContent from "../../components/user/Creative/Content";
import CreativeHeader from "../../components/user/Creative/Header";
import CreativeSidebar from "../../components/user/Creative/Sidebar";

import AgencyContent from "../../components/user/Agency/Content";
import AgencyHeader from "../../components/user/Agency/Header";
import AgencySidebar from "../../components/user/Agency/Sidebar";

import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Loader from "../../components/Loader";
import RestrictedUser from "../../components/RestrictedUser";

import { Context as CreativesContext } from "../../context/CreativesContext";
import { Context as AgenciesContext } from "../../context/AgenciesContext";
import { Context as AuthContext } from "../../context/AuthContext";
import Portfolio from "../../components/user/Creative/Portfolio";
import NotFound from "../../components/NotFound";
import { capitalize } from "@mui/material";
import useSeoHelper from "../../hooks/useSeoHelper";
import RestrictedAgency from '../../components/RestrictedAgency';

const Profile = () => {

  const { changeSeo } = useSeoHelper();

  const { username, type, role_name } = useParams();
  const page = type;

  const [roleName, setRoleName] = useState(null);

  const [isLoading, setLoading] = useState(true);
  const [recordError, setRecordError] = useState(null);

  const {
    state: { single_creative, creative_education, creative_experience },
    getCreative,
  } = useContext(CreativesContext);

  const {
    state: { single_agency, open_positions },
    getAgency, getOpenPositions,
  } = useContext(AgenciesContext);

  const {
    state: { user, role, token },
  } = useContext(AuthContext);

  const [data, setData] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  useEffect(() => {
    setRoleName(role_name == "advisor" || role_name == "recruiter" ? role_name : null);
  }, [role_name]);

  useEffect(() => {
    if (token) {
      if (page == "creative") {
        getCreative(username, (error) => {
          if (error) {
            setLoading(false);
          }
        });
      }
    }

    if (page == "agency") {
      let roleId = false;
      if (roleName == 'recruiter') {
        roleId = 5;
      }
      if (roleName == 'advisor') {
        roleId = 2;
      }
      getAgency(username, user ? user.username == username : false, roleId, (error) => {
        if (error) {
          setLoading(false);
        }
      });
    }
  }, [page, user, roleName]);

  useEffect(() => {
    if (page == "agency" && Object.keys(data).length) {
      getOpenPositions(data.user_id, 0, 1);
    }
  }, [page, data]);

  useEffect(() => {
    if (Object.keys(data)?.length > 0) {
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (page == "creative") {
      setData(single_creative);
      if (single_creative && Object.keys(single_creative)?.length > 0) {
        if (single_creative?.seo?.tags?.length > 0) changeSeo('keywords', single_creative.seo.tags);
        if (single_creative?.seo?.description?.length > 0) changeSeo('description', single_creative.seo.description);
        if (single_creative?.seo?.title?.length > 0) changeSeo('title', single_creative.seo.title);
      }
    } else if (page == "agency") {
      setData(single_agency);
      if (single_agency && Object.keys(single_agency)?.length > 0) {
        if (single_agency?.seo?.tags?.length > 0) changeSeo('keywords', single_agency.seo.tags);
        if (single_agency?.seo?.description?.length > 0) changeSeo('description', single_agency.seo.description);
        if (single_agency?.seo?.title?.length > 0) changeSeo('title', single_agency.seo.title);
      }
    }


  }, [single_creative, single_agency]);

  useEffect(() => {
    if (page == "creative") {
      setData(single_creative);
      if (single_creative && Object.keys(single_creative)?.length > 0) {
        if (single_creative?.seo?.tags?.length > 0) changeSeo('keywords', single_creative.seo.tags);
        if (single_creative?.seo?.description?.length > 0) changeSeo('description', single_creative.seo.description);
        if (single_creative?.seo?.title?.length > 0) changeSeo('title', single_creative.seo.title);
      }
    } else if (page == "agency") {
      setData(single_agency);
      if (single_agency && Object.keys(single_agency)?.length > 0) {
        if (single_agency?.seo?.tags?.length > 0) changeSeo('keywords', single_agency.seo.tags);
        if (single_agency?.seo?.description?.length > 0) changeSeo('description', single_agency.seo.description);
        if (single_agency?.seo?.title?.length > 0) changeSeo('title', single_agency.seo.title);
      }
    }


  }, [user, single_creative]);

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
          <RestrictedUser delay={0} />
        ) : (
          <NotFound heading={"Not Found"} content={capitalize(roleName ? roleName : page) + " profile with slug [" + username + "] not found."} />
        )}
      </>
    ) : (
      <>
        {!isOwnProfile && !isAdmin && (roleName == "advisor" || roleName == "recruiter") ? (
          <RestrictedAgency role={roleName ? roleName : page} delay={0} />
        ) : (
          <>
            <div className="profile-header">
              {page === "creative" ? (
                <CreativeHeader data={data} role={role} user={user} username={username} />
              ) : (
                <AgencyHeader data={data} role={role} user={user} />
              )}
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
                        <CreativeSidebar data={data} role={role} user={user} />
                      ) : (
                        <AgencySidebar data={data} />
                      )}
                    </div>
                    {page === "creative" ? (
                      <CreativeContent
                        user={user}
                        data={data}
                        role={role}
                        education={creative_education}
                        experience={creative_experience}
                      />
                    ) : (
                      <AgencyContent user={user} role={role} data={data} jobs={open_positions} />
                    )}
                  </div>
                  <div className="col-lg-4 col-md-6 col-12 d-none d-md-block">
                    <div className="profile-sidebar">
                      {page === "creative" ? (
                        <CreativeSidebar data={data} role={role} user={user} />
                      ) : (
                        <AgencySidebar data={data} user={user} role={role} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    )}
  </>
};

export default Profile;
