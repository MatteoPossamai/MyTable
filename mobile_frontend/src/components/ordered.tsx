// Global imports
import { useContext, useState } from "react";

// Local imports
// Components
import ItemComponent from "./itemComponent";
// Context
import { orderedContext } from "./base";
// Types
import Restaurant from "../types/restaurant";
import Item from "../types/item";

function Ordered(props: {restaurant: Restaurant}) {
  const {orderedItems, setOrderedItems, quantities, setQuantities} = useContext(orderedContext);

  // State
  const [visibleOrder, setVisibleOrder] = useState<boolean>(false);

  // Button function
  const changeVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setVisibleOrder(!visibleOrder);
  };

  return (
    <orderedContext.Provider value={{orderedItems, setOrderedItems, quantities, setQuantities}}>
      <section className={visibleOrder ? "orderSection open" :"orderSection"}>
          <button className="longButton" onClick={(e) => changeVisibility(e)}>{visibleOrder ? "Back": `View Order`}</button>
          <br />
          <ol>
              { orderedItems === undefined || orderedItems.length === 0 ? 
              
                  <p>There are no items in your order</p> :
              
                  orderedItems.map((item: Item) => (
                      <ItemComponent item={item} restaurant={props.restaurant} key={item.id} />
                  ))

              }
              <button className="total" onClick={(e) => e.preventDefault()}>Total: €{
                  orderedItems === undefined || orderedItems.length === 0 ?
                  0 :
                  orderedItems.map((item: Item) => (
                      item.price * quantities[orderedItems.indexOf(item)]
                  )).reduce((a: any, b:any) => a + b)

                } </button>
              <button className="longButton" onClick={(e) => console.log("GO TO Pay Page")}>Send Order &rarr;</button>
          </ol>
      </section> 
    </orderedContext.Provider>
  );
}

export default Ordered;