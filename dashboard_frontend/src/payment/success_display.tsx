
const SuccessDisplay = (props: { sessionId: any }) => {
  // Take the base link from the .env file
  let base_link:string | undefined = process.env.REACT_APP_BASE_LINK;

  return (
    <section>
      <div className="product Box-root">
        <div className="description Box-root">
          <h3>Subscription to starter plan successful!</h3>
        </div>
      </div>
      <form action={`${base_link}/stripe/create-portal-session/`} method="POST">
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