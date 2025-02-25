import "../styles/SpotlightCreative.css";
import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Context } from "../context/SpotlightContext";
import PageNotFound from "../components/PageNotFound";

const SpotlightReel = () => {
    const { slug } = useParams();

    const {
        state: { sreel },
        getSpotlight,
    } = useContext(Context);

    useEffect(() => {
        if (slug) {
            getSpotlight(slug);
        }
    }, [slug]);

    useEffect(() => {
        console.log(sreel);
    }, [sreel]);

    return (
        <div className="dark-container page-spotlight mb-0 mt-4">
            <div className="container p-md-0 px-5">
                <div className="row">
                    <div className="col-12">
                        {sreel && !sreel?.error && (
                            <>
                                <h1 className="text-white text-center" style={{ fontSize: '20px' }} dangerouslySetInnerHTML={{ __html: sreel.title }}></h1>
                                <video autoPlay muted controls style={{ width: '560px', display: 'block', margin: '0 auto' }} controlsList="nodownload" >
                                    <source src={sreel.url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </>
                        )}

                        {sreel && sreel?.error && (
                            <PageNotFound />
                        )}
                    </div>
                </div>
            </div >
        </div >
    );
};

export default SpotlightReel;
