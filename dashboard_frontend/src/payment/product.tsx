const Product = (props: { name: string, price: number | any, setSelect: any}) => {
    return(
    <div className="product">
        <div className="description">
          <h3>{props.name}</h3>
          <h5>${props.price} / month</h5>
        </div>

        <input type={"checkbox"} onChange={(e) => {
            if (e.target.checked) {
                props.setSelect((prev: any) => [...prev, {id: props.name, name: props.name, price: props.price}]);
            } else {
                props.setSelect((prev: any) => prev.filter((product: any) => product.id !== props.name));
            }
        }}/>  
      </div>
    );
}

export default Product;