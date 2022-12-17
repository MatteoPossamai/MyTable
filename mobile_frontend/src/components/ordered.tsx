// Global imports
import { useContext, useState } from "react";

// Local imports
// Components
import ItemComponent from "./itemComponent";
// Context
import { orderedContext } from "./base";
// Types
import Order from "../types/order";
import Restaurant from "../types/restaurant";

function Ordered(props: {restaurant: Restaurant}) {
  const {orderedItems, setOrderedItems} = useContext(orderedContext);

  // State
  const [visibleOrder, setVisibleOrder] = useState<boolean>(false);

  // Button function
  const changeVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setVisibleOrder(!visibleOrder);
  };

  return (
    <section className={visibleOrder ? "orderSection open" :"orderSection"}>
        <button className="longButton" onClick={(e) => changeVisibility(e)}>{visibleOrder ? "Back": `View Order`}</button>
        <br />
        <ol>
            { orderedItems === undefined || orderedItems.length === 0 ? 
            
                <p>There are no items in your order</p> :
            
                orderedItems.map((order: Order) => (
                    <ItemComponent item={order.item} restaurant={props.restaurant} key={order.item.id} quantity={order.quantity} />
                ))

            }
            <button className="longButton" onClick={(e) => console.log("GO TO Pay Page")}>Send Order &rarr;</button>
        </ol>
    </section>
  );
}

export default Ordered;