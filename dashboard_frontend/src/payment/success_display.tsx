import Logo from "./logo";


const SuccessDisplay = (props:{ sessionId: any }) => {
    return (
      <section>
        <div className="product Box-root">
          <Logo />
          <div className="description Box-root">
            <h3>Subscription to starter plan successful!</h3>
          </div>
        </div>
        <form action="/create-portal-session" method="POST">
          <input
            type="hidden"
            id="session-id"
            name="session_id"
            value={props.sessionId}
          />
          <button id="checkout-and-portal-button" type="submit">
            Manage your billing information
          </button>
        </form>
      </section>
    );
  };

export default SuccessDisplay;