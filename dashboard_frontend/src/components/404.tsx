// Global imports
import { TbError404 } from "react-icons/tb";
import { BiError } from "react-icons/bi";

function FourOhFour() {
  return (
    <div className="fof" onClick={() => window.location.replace('https://mytablelanding.netlify.app/') }>
        <TbError404 className="ice" />
        <h1>Page not found</h1>
        <p>Mi dispiace, ma questa pagina non esiste. Clicca qui per venire reinderizzato</p>
        <BiError className="ice" />
    </div>
  );
}

export default FourOhFour;