import { useState, useContext, useEffect } from "react";
import { Context as CreativesContext } from "../context/CreativesContext";

const NewMemberWidgetRightSidebar = (props) => {

    const showMaxIndustryExperiences = 1;
    const [defaultAvatar, setDefaultAvatar] = useState("https://adagencycreatives.noorsofttechdev.com/static/media/placeholder.12b7e9aaed5e5566bc6a.png");
    const [singleCreative, setSingleCreative] = useState(null);
    const {
        state: { single_creative, },
        getCreativeById,
    } = useContext(CreativesContext);

    useEffect(() => {
        if (single_creative && single_creative.user_id == props.new_member.user_id) {
            setSingleCreative(single_creative);
        }
    }, [single_creative]);

    useEffect(() => {
        getCreativeById(props.new_member.user_id);
    }, []);

    return (
        <li className="vcard">
            <div className="item new-member-widget">
                <div className="item-title fn">
                    <a href={"/creative/" + props.new_member.slug}>
                        {props.new_member.name}
                    </a>
                </div>
                <div className="item-industry-experience">
                    {/* {singleCreative && singleCreative.industry_experience && singleCreative.industry_experience.length ? singleCreative.industry_experience.slice(0, Math.min(showMaxIndustryExperiences, singleCreative.industry_experience.length)).join(', ') : ""} */}
                    {singleCreative && singleCreative.title ? singleCreative.title : ""}
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