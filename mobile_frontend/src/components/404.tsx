// Global imports
import { useNavigate } from "react-router-dom";
import { TbError404 } from "react-icons/tb";

function FourOhFour() {
  // Creation and handling of the navigation
  let history = useNavigate();

  const goToMenu = (e:any) => {
      e.preventDefault();
      history(`/`);
  }

  return (
    <div className="error_container">
        <TbError404 className="error404" />
        <h1 className="f0f">
            Errore <br />
            Pagina <br />
            inesistente
        </h1>
        <button className="bigButton" onClick={(e)=>{goToMenu(e)}}>Torna alla homepage</button>
    </div>
  )
}

export default FourOhFour;