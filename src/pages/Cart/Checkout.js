import "../../styles/Cart/Checkout.scss";
import OrderDetails from "../../components/cart/checkout/OrderDetails";
import Payment from "../../components/cart/checkout/Payment";
import { useState } from "react";

const Checkout = ({ user }) => {
  const [fields, setFields] = useState({
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
  });

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div className="row checkout-form">
            <h4 className="heading">Billing details</h4>
            <div className="col-12">
              <label htmlFor="email" className="form-label">
                Email Address
                <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={fields.email}
                onChange={handleChange}
              />
            </div>
            <div className="col-6">
              <label htmlFor="first_name" className="form-label">
                First Name
                <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                value={fields.first_name}
                onChange={handleChange}
              />
            </div>
            <div className="col-6">
              <label htmlFor="last_name" className="form-label">
                Last Name
                <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                value={fields.last_name}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <label htmlFor="email" className="form-label">
                Company Name (optional)
              </label>
              <input type="text" className="form-control" name="email" />
            </div>
            <div className="col-12">
              <label htmlFor="email" className="form-label">
                Phone
                <span className="required">*</span>
              </label>
              <input type="text" className="form-control" name="phone" />
            </div>
            <div className="col-12 mt-3">
              <h4 className="heading">Additional Information</h4>
              <label htmlFor="email" className="form-label">
                Order notes (optional)
              </label>
              <textarea
                className="form-control"
                name="email"
                placeholder="Notes about your order, e.g. special notes for delivery."
              ></textarea>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <OrderDetails />
          <Payment />
        </div>
      </div>
    </>
  );
};

export default Checkout;
