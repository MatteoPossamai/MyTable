import { useState, useEffect } from "react";

// Local imports
// Components
import Product from "./product";
// Styles
import "../styles/payment.css";

const ProductDisplay = () => {
	const base_link:string | undefined = process.env.REACT_APP_BASE_LINK;
	let token: any = localStorage.getItem("token");

	const [products, setProducts] = useState<any>([]);
	const [selectedProducts, setSelectedProducts] = useState<any>([]);
	const [email, setEmail] = useState<string>("");

	useEffect(() => {
		fetch(`${base_link}/stripe/products/`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            return res.json();
        }
        ).then((data) => {
			let products = data.data;
			// Sort the products by name
			products.sort((a: any, b: any) => { return  a.name.localeCompare(b.name) });
			setProducts(products);
        }).catch((err) => {
            console.log(err);
        })
	}, [base_link]);

	useEffect(() => {
		// Load the restaurant informations
        let id = window.location.pathname.split("/")[2];

        fetch(`${base_link}/restaurant/${id}/`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            return res.json();
        }
        ).then((data) => {
            let informations = data.restaurant;
            setEmail(informations.owner);
        }).catch((err) => {
            console.log(err);
        })
	}, [base_link])

	const removeFromSelected = (id: number) => {
		let newSelectedProducts = selectedProducts.filter((product: any) => product.id !== id);
		setSelectedProducts(newSelectedProducts);
	};
				
	return (<section className="planContainer">
		<div>			
			<aside className="products">
				<div className="provaGratis">
					<h3>Ottieni il massimo con la</h3>
					<h2>Prova gratis</h2>
					<p>Customizza il tuo piano ed ottieni subito una prova gratuita di 30 giorni, 
						senza alcun impegno, per innamorarti del nostro servizio.
					</p>
				</div>
				{products.map((product: any) => {
					return (
						<Product
							key={product.id}
							name={product.name}
							price={(product.default_price.unit_amount) / 100}
							selected={selectedProducts}
							setSelect={setSelectedProducts}
							description={product.description}
							price_id={product.default_price.id}
						/>
					);
				})}
			</aside>
			<form action={`${base_link}/stripe/customer-portal/`} method="POST" className="checkoutForm2"
				style={{height: "fit-content"}}>
					<h1>Piano corrente</h1>
					<p>In questa pagina puoi trovare il piano a cui sei correntemente abbonato. Se desideri 
						visualizzare o cambiare piano, clicca sul pulsante sottostante.
					</p>
					<input type={"hidden"} name={"token"} value={token} />
					<button id="checkout-and-portal-button" type="submit" className="submitBTN"> Modifica piano </button>
			</form>
		</div>

		<div className="secondContainer">
				<form action={`${base_link}/stripe/create-checkout-session/`} method="POST"
					className="checkoutForm">

					{/* Add a hidden field with the lookup_key of your Price */}
					<h3>Riepilogo del piano</h3>
					<hr className="dashed" />
					<aside className="checkoutSummary">
						<ul className="checkoutSummaryList">
							{selectedProducts.map((product: any) => (
								<div key={product.id} className="prods">
									<aside>
										<h3>{product.name}</h3>

										<h3>${product.price} </h3>
									</aside>
								<button className="submitBTN" onClick={() => {removeFromSelected(product.id)}} type="button">
									Remove
								</button>
							</div>
							))}
						</ul>
						
					</aside>
					
					<aside className="total">
						<hr className="dashed" />
							<h3>
								Totale: €
								{selectedProducts.reduce(
									(total: number, product: any) =>
										Number(total) + Number(product.price),	0
								)} / mese
							</h3>
						{selectedProducts.map((product: any) => {
							return (
								<input key={product.id} type="hidden" name="price" value={product.price_id} />
							);
						})}
						<input type="hidden" name="customer_email" value={email} />
						<button id="checkout-and-portal-button" type="submit" className="submitBTN" 
							disabled={selectedProducts.length === 0 ? true : false}
							style={{background: selectedProducts.length === 0 ? "#8E8EA9" : "#530F26" }}>
							Attiva il tuo piano
						</button>
					</aside>
				</form>
		</div>

			
		</section>
	);
};

export default ProductDisplay;