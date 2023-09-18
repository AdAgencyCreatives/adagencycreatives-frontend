import Layout from "./index";
import "../../styles/Cart/Checkout.scss";
import OrderDetails from "../../components/cart/checkout/OrderDetails";
import Payment from "../../components/cart/checkout/Payment";

const Checkout = () => {
  return (
    <Layout>
      <div className="row">
        <div className="col-md-6">
          <div className="row checkout-form">
            <div className="col-12">
              <label htmlFor="email" className="form-label">
                Email Address
                <span className="required">*</span>
              </label>
              <input type="text" className="form-control" name="email" />
            </div>
            <div className="col-6">
              <label htmlFor="email" className="form-label">
                First Name
                <span className="required">*</span>
              </label>
              <input type="text" className="form-control" name="email" />
            </div>
            <div className="col-6">
              <label htmlFor="email" className="form-label">
                Last Name
                <span className="required">*</span>
              </label>
              <input type="text" className="form-control" name="email" />
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
            <div className="col-12">
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
    </Layout>
  );
};

export default Checkout;
