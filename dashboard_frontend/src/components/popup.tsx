
// Local import 
// Types
import PopupMessage from '../types/popupMessage';

function PopUp(props: {popUp: PopupMessage}) {
  const { popUp } = props;
  return (
    <div className={popUp.type == "success" ? "basePopUp successPopUp" : "basePopUp errorPopUp"}>
        <h1>{popUp.title}</h1>
        <p>{popUp.message}</p>
    </div>
  );
}

export default PopUp;