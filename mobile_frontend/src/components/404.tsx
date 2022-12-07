// Global imports
import { TbError404 } from "react-icons/tb";
import { BiError } from "react-icons/bi";

// Local imports
// Components
import Footer from "./footer"

function FourOhFour() {
  return (
    <div className="error_container">
        <TbError404 className="error404" />
        <h1 className="f0f">
            Errore <br />
            Pagina <br />
            inesistente
        </h1>
        <BiError className="error404" />
        <Footer />
    </div>
  )
}

export default FourOhFour;