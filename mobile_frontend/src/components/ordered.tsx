// Global imports
import { useContext, useState, memo } from "react";

// Local imports
// Components
import ItemComponent from "./itemComponent";
import AssurancePopUp from "./assurancePopUp";
// Context
import { orderedContext } from "./base";
// Types
import Restaurant from "../types/restaurant";
import Item from "../types/item";

const Ordered = memo((props: {restaurant: Restaurant}) => {
  const {orderedItems, setOrderedItems, quantities, setQuantities} = useContext(orderedContext);

  // State
  const [visibleOrder, setVisibleOrder] = useState<boolean>(false);
  const [visibleAssurance, setVisibleAssurance] = useState<boolean>(false);

  // Button function
  const changeVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setVisibleOrder(!visibleOrder);
  };

  // Open assurance popup
  const popUpize = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(orderedItems === undefined || orderedItems.length === 0) return;
    setVisibleAssurance(true);
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
              <button className="longButton" onClick={(e) => popUpize(e)}>Send Order &rarr;</button>
          </ol>

          <AssurancePopUp visible={visibleOrder && visibleAssurance} toggle={setVisibleAssurance} />
      </section> 
    </orderedContext.Provider>
  );
});

export default Ordered;