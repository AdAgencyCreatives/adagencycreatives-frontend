import { IoStar } from "react-icons/io5";
import moment from "moment";

const ReviewsList = ({ reviews }) => {
  console.log(reviews);
  return (
    <div id="comments" className="my-3">
      <ol className="comment-list">
        {reviews.map((review) => {
          return (
            <li className="bypostauthor">
              <div className="the-comment">
                <div className="avatar">
                  <img alt="" src="https://aacstagingsite.wpengine.com/wp-content/plugins/buddypress/bp-core/images/mystery-man.jpg" className="avatar avatar-80 photo" height="80" width="80" />    
                </div>
                <div className="comment-box">
                  <div className="d-flex justify-content-between clearfix">
                    <div className="meta comment-author">
                      <div className="info-meta">
                        <strong>
                          {review?.user}
                        </strong>
                        <div className="date">
                          <i className="flaticon-event"></i>
                          {moment(review?.created_at).format("MMMM D, YYYY")}
                        </div>
                      </div>
                    </div>

                    <div className="star-rating clear ali-right" title={`Rated ${review?.rating} out of 5`}>
                      <span className="review-avg">{review?.rating.toFixed(1)}</span>
                      <div className="review-stars-rated-wrapper">
                        <div className="review-stars-rated">
                          <ul className="review-stars">
                            <li><IoStar size={15} color={review?.rating >= 1 && '#FFC78B'} /></li>
                            <li><IoStar size={15} color={review?.rating >= 2 && '#FFC78B'} /></li>
                            <li><IoStar size={15} color={review?.rating >= 3 && '#FFC78B'} /></li>
                            <li><IoStar size={15} color={review?.rating >= 4 && '#FFC78B'} /></li>
                            <li><IoStar size={15} color={review?.rating === 5 && '#FFC78B'} /></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div itemprop="description" className="comment-text">
                    <p>{review?.comment}</p>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  );
};

export default ReviewsList;
  