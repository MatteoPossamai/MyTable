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
				
	return (<section className="planContainer">

		<div>
			<h1>Customize your plan</h1>
			<aside className="products">
				{products.map((product: any) => {
					return (
						<Product
							key={product.id}
							name={product.name}
							price={(product.default_price.unit_amount) / 100}
							setSelect={setSelectedProducts}
							description={product.description}
							price_id={product.default_price.id}
						/>
					);
				}
					
				)}
			</aside>
		</div>

		<div className="secondContainer">
				<form action={`${base_link}/stripe/customer-portal/`} method="POST" className="checkoutForm">
					<h1>Your current plan</h1>
					<aside className="checkoutSummary">
						<ul className="checkoutSummaryList">

						</ul>

						<h4> Your bill: $10 </h4>
					</aside>
					<input type={"hidden"} name={"token"} value={token} />
					<button id="checkout-and-portal-button" type="submit" className="submitBTN"> Cancel subsription </button>
				</form>

				<form action={`${base_link}/stripe/create-checkout-session/`} method="POST"
					className="checkoutForm">

					{/* Add a hidden field with the lookup_key of your Price */}
					<aside className="checkoutSummary">
						<h3>Plan preview</h3>
						<ul className="checkoutSummaryList">
							{selectedProducts.map((product: any) => (
								<div key={product.id}>
								<li key={product.id}>
									{product.name} - ${product.price}
								</li>
								<hr />
							</div>
							))}
						</ul>

						<h4>
							Total: $
							{selectedProducts.reduce(
								(total: number, product: any) =>
									Number(total) + Number(product.price),	0
							)}
						</h4>
					</aside>

					{selectedProducts.map((product: any) => {
						return (
							<input key={product.id} type="hidden" name="price" value={product.price_id} />
						);
					})}
					<input type="hidden" name="customer_email" value={email} />
					<button id="checkout-and-portal-button" type="submit" className="submitBTN">
						Change plan
					</button>
				</form>
			</div>
		</section>
	);
};

export default ProductDisplay;