import { useContext, useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";
import { Context as DataContext } from "../../../context/DataContext";
import ReviewForm from './ReviewForm';
import ReviewsList from './ReviewsList';

const Reviews = ({ user, data }) => {  
  const [dispalyForm, setDispalyForm] = useState(false);

  const {
    state: { reviews, reviewsMeta },
    getReviews
  } = useContext(DataContext);

  useEffect(() => {
    mutateReviews();
  }, [data]);

  const mutateReviews = () => {
    getReviews(data?.user_id);
  }

  return (
    <div id="reviews">
      <div className="average-rating d-flex align-items-center gap-2">
        {data?.type === 'agencies' ? 'Agency' : 'Creative'} Reviews
        <div className="d-flex align-items-center gap-2">
          <IoStar size={22} color="#000" />
          {reviewsMeta?.average_rating?.toFixed(2) ?? 0.00 }
        </div>
      </div>
      {reviews?.length > 0 && (
        <ReviewsList reviews={reviews} />
      )}
      {!dispalyForm ? (
        <button 
          className="btn btn-dark fs-5 my-2" 
          type="button" 
          onClick={() => { setDispalyForm(true) }}
        >
          Submit Review
        </button>
      ) : (
        <ReviewForm user={user} data={data} mutateReviews={mutateReviews} setDispalyForm={setDispalyForm} />
      )}
    </div>
  );
};

export default Reviews;
  