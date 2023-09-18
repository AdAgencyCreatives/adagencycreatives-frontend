const Payment = () => {
  return (
    <div className="checkout-payment box-review-order">
      <input
        id="payment_method_woocommerce_payments"
        type="radio"
        class="input-radio me-3"
        name="payment_method"
        checked="checked"
      />
      <label for="payment_method_woocommerce_payments">
        Popular payment methods
      </label>
      
    </div>
  );
};

export default Payment;
