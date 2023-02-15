// Local imports
// Styles
import '../styles/payment.css';

const Product = (props: { name: string, price: number | any, setSelect: any, description: string, price_id: string, selected: any}) => {

  const handleCheck = (e: any) => {
    e.preventDefault();
    if(props.selected.filter((product: any) => {return product.id === props.name}).length === 0){
      props.setSelect((prev: any) => [...prev, {id: props.name, name: props.name, price: props.price, price_id: props.price_id}]);
    }else {
      props.setSelect((prev: any) => prev.filter((product: any) => product.id !== props.name));
    }
  }

  return(
      <div className="product">
        <h2>{props.name}</h2>
        <p>{props.description}</p>    
        <hr className="dashed" />
        
        <aside style={{display: "flex", flexDirection: "row", margin: " 0 25%"}}>
          <p><b style={{fontSize: "1.3em"}}>€{props.price}</b>/ month</p>
        </aside>

        {/*Button changes his aspect if the element is in the selected list or not */}
        <button className='submitBTN' onClick={(e) => {handleCheck(e)}} >
          {props.selected.filter((product: any) => {return product.id === props.name}).length === 0 ? "Aggiungi" : "Rimuovi"}</button>
      </div>
    );
}

export default Product;