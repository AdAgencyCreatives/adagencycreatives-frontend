import { useContext, useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";
import { Context as DataContext } from "../../../context/DataContext";
import ReviewForm from "./ReviewForm";
import ReviewsList from "./ReviewsList";

const Reviews = ({ user, data }) => {
  const [dispalyForm, setDispalyForm] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const {
    state: { reviews, reviewsMeta },
    getReviews,
  } = useContext(DataContext);

  useEffect(() => {
    mutateReviews();
  }, [data]);

  const mutateReviews = () => {
    getReviews(data?.user_id);
  };

  return (
    <div id="reviews">
      <div className="average-rating d-flex align-items-center gap-2">
        {data?.type === "agencies" ? "Agency" : "Creative"} Reviews
        <div className="d-flex align-items-center gap-2" onClick={() => setShowReviews((prev) => !prev)}>
          <IoStar size={22} color="#000" />
          {reviewsMeta?.average_rating?.toFixed(2) ?? 0.0}
        </div>
        {!dispalyForm && (
          <button
            className="btn btn-dark fs-5 my-2"
            type="button"
            onClick={() => {
              setDispalyForm(true);
            }}
          >
            Submit Review
          </button>
        )}
      </div>
      {reviews?.length > 0 && showReviews && <ReviewsList reviews={reviews} />}
      {dispalyForm && (
        <ReviewForm
          user={user}
          data={data}
          mutateReviews={mutateReviews}
          setDispalyForm={setDispalyForm}
          hasReviews={reviews?.length}
        />
      )}
    </div>
  );
};

export default Reviews;
