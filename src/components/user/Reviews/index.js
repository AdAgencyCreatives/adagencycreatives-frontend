import { useContext, useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";
import { Context as DataContext } from "../../../context/DataContext";
import ReviewForm from "./ReviewForm";
import ReviewsList from "./ReviewsList";

const Reviews = ({ user, data }) => {
  const [dispalyForm, setDispalyForm] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [userReview, setUserReview] = useState(null);
  const [editReview, setEditReview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    state: { reviews, reviewsMeta },
    getReviews,
    deleteReview,
  } = useContext(DataContext);

  useEffect(() => {
    mutateReviews();
  }, [data]);

  const mutateReviews = () => {
    getReviews(data?.user_id);
  };

  useEffect(() => {
    if (user && reviews)
      setUserReview(reviews.find((item) => item.user_id == user.uuid));
  }, [user, reviews]);

  const onEditReview = (e, review) => {
    setEditReview(true);
    setDispalyForm(true);
  };

  const onDeleteReview = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await deleteReview(userReview.uuid);
    mutateReviews();
    setIsLoading(false);
    setDispalyForm(false);
  };

  return (
    <div id="reviews">
      <div className="average-rating d-flex align-items-center gap-2 flex-wrap">
        {data?.type === "agencies" ? "Agency" : "Creative"} Reviews
        <div
          className="d-flex align-items-center gap-2"
          onClick={() => setShowReviews((prev) => !prev)}
        >
          <IoStar size={22} color="#000" />
          {reviewsMeta?.average_rating?.toFixed(2) ?? 0.0}
        </div>
        {!dispalyForm && (
          <>
            {!userReview ? (
              <button
                className="btn btn-dark fs-5 my-2"
                type="button"
                onClick={() => {
                  setDispalyForm(true);
                }}
              >
                Submit Review
              </button>
            ) : (
              <>
                Your Review{" "}
                <span className="rating-submitted">
                  <IoStar size={14} color="#000" />{" "}
                  {userReview?.rating?.toFixed(2)}
                </span>
                <span className="d-flex gap-2">
                  <button
                    className="btn btn-dark btn-review"
                    type="button"
                    onClick={(e) => {
                      onEditReview(e, userReview);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-dark btn-review"
                    type="button"
                    onClick={(e) => {
                      onDeleteReview(e);
                    }}
                  >
                    Delete
                    {isLoading && (
                      <div className="spinner-border text-light"></div>
                    )}
                  </button>
                </span>
              </>
            )}
          </>
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
          editReview={editReview}
          setEditReview={setEditReview}
          userReview={userReview}
        />
      )}
    </div>
  );
};

export default Reviews;
