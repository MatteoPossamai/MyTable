import Logo from "./logo";

const ProductDisplay = () => (
    
    <section>
      <div className="product">
        <Logo />
        <div className="description">
          <h3>Starter plan</h3>
          <h5>$20.00 / month</h5>
        </div>
      </div>
      <form action="http://127.0.0.1:8000/api/v1/stripe/create-checkout-session/" method="POST">
        {/* Add a hidden field with the lookup_key of your Price */}
        <input type="hidden" name="lookup_key" value="1" />
        <input type="hidden" name="lookup_key" value="122" />
        <button id="checkout-and-portal-button" type="submit">
          Checkout
        </button>
      </form>
    </section>
  );

export default ProductDisplay;