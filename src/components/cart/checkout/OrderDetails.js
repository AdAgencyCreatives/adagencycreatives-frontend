const OrderDetails = () => {
  return (
    <div className="review-order-table box-review-order">
      <h3 id="order_review_heading">Your order</h3>
      <table class="review-order_table ">
        <thead>
          <tr>
            <th class="product-name">Product</th>
            <th class="product-total">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr class="cart_item">
            <td class="product-name">
              Multiple Creative Jobs&nbsp;
              <strong class="product-quantity">×&nbsp;1</strong>
              <dl class="variation">
                <dt class="variation-JobListing">Job Listing:</dt>
                <dd class="variation-JobListing">
                  <p>Test Job</p>
                </dd>
              </dl>
            </td>
            <td class="product-total">
              <span class="woocommerce-Price-amount amount">
                <bdi>
                  <span class="woocommerce-Price-currencySymbol">$</span>
                  349.00
                </bdi>
              </span>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="cart-subtotal">
            <th>Subtotal</th>
            <td>
              <span class="woocommerce-Price-amount amount">
                <bdi>
                  <span class="woocommerce-Price-currencySymbol">$</span>
                  349.00
                </bdi>
              </span>
            </td>
          </tr>

          <tr class="order-total">
            <th>Total</th>
            <td>
              <strong>
                <span class="woocommerce-Price-amount amount">
                  <bdi>
                    <span class="woocommerce-Price-currencySymbol">$</span>
                    349.00
                  </bdi>
                </span>
              </strong>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default OrderDetails;
