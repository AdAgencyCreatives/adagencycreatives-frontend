import { useContext, useState } from "react";
import { IoStar } from "react-icons/io5";
import { Context as DataContext } from "../../../context/DataContext";
import { containsOffensiveWords } from "../../../context/AuthContext";

const ReviewForm = ({ user, data, mutateReviews, setDispalyForm }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isCreative = data.type == "creatives";
  const isAgency = data.type == "agencies";

  const { postReview } = useContext(DataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment === "") {
      setMessage({
        class: "warning",
        content: "Please add your comment!",
      });
      return;
    }
    if (containsOffensiveWords(comment)) {
      setMessage({
        class: "warning",
        content: "Your comment includes offensive language. Please rephrase.",
      });
      return;
    }
    const review = {
      user_id: user.uuid,
      target_id: data.user_id,
      rating: rating,
      comment: comment,
    };
    setIsLoading(true);
    await postReview(review);

    setRating(5);
    setComment("");
    setMessage({
      class: "info",
      content: "Review submitted successfully!",
    });
    mutateReviews();
    setTimeout(() => setMessage(null), 5000);
    setIsLoading(false);
    setDispalyForm(false);
  };

  const ReviewMessage = () => {
    let message;
    if (isCreative) {
      message = (
        <>
          Have you worked with {data.name}?<br />
          Share your feedback for others seeking to work with {data.name}
        </>
      );
      return message;
    } else if (isAgency) {
      message = (
        <>
          Have you worked at {data.name}?<br />
          Share your feedback for others seeking to work at {data.name}
        </>
      );
      return message;
    } else {
      return <>Your rating for this listing</>;
    }
  };

  return (
    <div id="review_form_wrapper" className="commentform">
      <div id="review_form">
        <div className="commentform reset-button-default">
          <div id="respond" className="comment-respond">
            <h4 className="title comment-reply-title">
              Be the first to review “{data.name}”
              <small>
                <a
                  rel="nofollow"
                  id="cancel-comment-reply-link"
                  href="/agency/contacttma/#respond"
                  style={{ display: "none" }}
                >
                  Cancel reply
                </a>
              </small>
            </h4>
            <form
              onSubmit={handleSubmit}
              id="commentform"
              className="comment-form"
            >
              <div className="choose-rating clearfix">
                <div className="choose-rating-inner row">
                  <div className="col-sm-12 col-xs-12">
                    <div className="form-group yourview">
                      <div className="your-rating">
                        <ReviewMessage />
                      </div>
                      <div className="wrapper-rating-form my-2">
                        <div className="comment-form-rating">
                          <ul className="review-stars">
                            <li onClick={() => setRating(1)}>
                              <IoStar
                                size={22}
                                color={rating >= 1 && "#daa520"}
                              />
                            </li>
                            <li onClick={() => setRating(2)}>
                              <IoStar
                                size={22}
                                color={rating >= 2 && "#daa520"}
                              />
                            </li>
                            <li onClick={() => setRating(3)}>
                              <IoStar
                                size={22}
                                color={rating >= 3 && "#daa520"}
                              />
                            </li>
                            <li onClick={() => setRating(4)}>
                              <IoStar
                                size={22}
                                color={rating >= 4 && "#daa520"}
                              />
                            </li>
                            <li onClick={() => setRating(5)}>
                              <IoStar
                                size={22}
                                color={rating === 5 && "#daa520"}
                              />
                            </li>
                          </ul>
                        </div>
                        <label htmlFor="rating">Your Rating</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="group-upload-preview clearfix"></div>
              <div className="form-group space-30">
                <label>Review</label>
                <textarea
                  id="comment"
                  className="form-control"
                  placeholder="Write Comment"
                  name="comment"
                  cols="45"
                  rows="5"
                  required=""
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
              <p className="form-submit mt-3">
                <button className="btn btn-dark fs-5" type="submit">
                  Submit Review
                  {isLoading && (
                    <div className="spinner-border text-light"></div>
                  )}
                </button>
              </p>
              {message && (
                <div className={`alert alert-${message.class}`}>
                  {message.content}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
