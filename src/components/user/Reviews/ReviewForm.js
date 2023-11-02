import { useContext, useState } from "react";
import { IoStar } from "react-icons/io5";
import { Context as DataContext } from "../../../context/DataContext";

const ReviewForm = ({ user, data, mutateReviews, setDispalyForm }) => {  
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    postReview,
  } = useContext(DataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment === '') {
      setMessage({
        class: "warning",
        content: "Please add your comment!",
      });
      return;
    }
    const review = {
      user_id: user.uuid,
      target_id: data.user_id,
      rating: rating,
      comment: comment
    }
    setIsLoading(true);
    await postReview(review);
    setRating(5);
    setComment('');
    setMessage({
      class: "info",
      content: "Review submitted successfully!",
    });
    mutateReviews();
    setTimeout(() => setMessage(null), 5000);
    setIsLoading(false);
    setDispalyForm(false);
  };

  return (
    <div id="review_form_wrapper" className="commentform">
      <div id="review_form">
        <div className="commentform reset-button-default">
          <div id="respond" className="comment-respond">
            <h4 className="title comment-reply-title">
              Be the first to review “The Marketing Arm” 
              <small><a rel="nofollow" id="cancel-comment-reply-link" href="/agency/contacttma/#respond" style={{ display: 'none' }}>Cancel reply</a></small>
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
                      <div className="your-rating">Your Rating for this listing</div>
                      <div className="wrapper-rating-form my-2">
                        <div className="comment-form-rating">
                          <ul className="review-stars">
                            <li onClick={() => setRating(1)}><IoStar size={15} color={rating >= 1 && '#FFC78B'} /></li>
                            <li onClick={() => setRating(2)}><IoStar size={15} color={rating >= 2 && '#FFC78B'} /></li>
                            <li onClick={() => setRating(3)}><IoStar size={15} color={rating >= 3 && '#FFC78B'} /></li>
                            <li onClick={() => setRating(4)}><IoStar size={15} color={rating >= 4 && '#FFC78B'} /></li>
                            <li onClick={() => setRating(5)}><IoStar size={15} color={rating === 5 && '#FFC78B'} /></li>
                          </ul>
                        </div>
                        <label for="rating">Your Rating</label>
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
  