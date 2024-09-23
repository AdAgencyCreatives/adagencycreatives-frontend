import { useState, useContext, useEffect } from "react";
import { Context as CreativesContext } from "../context/CreativesContext";

const NewMemberWidgetRightSidebar = (props) => {

    const showMaxIndustryExperiences = 1;
    const [defaultAvatar, setDefaultAvatar] = useState("https://api.adagencycreatives.com/assets/img/placeholder.png");

    return (
        <li className="vcard">
            <div className="item new-member-widget">
                <div className="item-title fn">
                    <a href={"/creative/" + props.new_member.slug}>
                        {props.new_member.name}
                    </a>
                </div>
                <div className="item-industry-experience">
                    {/* {singleCreative?.industry_experience?.length > 0 ? singleCreative.industry_experience.slice(0, Math.min(showMaxIndustryExperiences, singleCreative.industry_experience.length)).join(', ') : ""} */}
                    {props.new_member.category}
                </div>
                <div className="item-meta">
                    <a href={"/creative/" + props.new_member.slug}>
                        <span className="activity">Portfolio</span>
                    </a>
                </div>
            </div>
        </li>
    );
}

export default NewMemberWidgetRightSidebar;