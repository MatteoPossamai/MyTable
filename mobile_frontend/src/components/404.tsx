// Global imports
import { useNavigate } from "react-router-dom";
import { TbError404 } from "react-icons/tb";
import { BiError } from "react-icons/bi";

// Local imports
// Components
import Footer from "./footer"

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
        <BiError className="error404" />
        <button className="goto" onClick={(e)=>{goToMenu(e)}}>Torna alla homepage</button>
        <Footer />
    </div>
  )
}

export default FourOhFour;