import { useState, useEffect } from "react";

// Local imports
// Components
import Product from "./product";
// Styles
import "../styles/payment.css";

const ProductDisplay = () => {

	const [products, setProducts] = useState<any>([]);
	const [selectedProducts, setSelectedProducts] = useState<any>([]);

	const fetchProducts = async () => {
		//const response = await fetch("http://127.0.0.1:8000/api/v1/stripe/prices/");
		//const data = await response.json();
		setProducts([{'id': 1, 'product': {'name': 'Dynamic Menu'},  "unit_amount": '10'}, 
		{'id': 2, 'product': {'name': 'Ordination from clients'},  "unit_amount": '10'},
		{'id': 3, 'product': {'name': 'Ordination from waiters'},  "unit_amount": '10'},
		{'id': 4, 'product': {'name': 'Ordination from clients'},  "unit_amount": '10'},
		{'id': 5, 'product': {'name': 'Dynamic menu with image'},  "unit_amount": '10'},
		]);
	};

		useEffect(() => {
			fetchProducts();
		}, []);
				
		return (<section className="planContainer">

			<div>
				<h1>Customize your plan</h1>
				<aside className="products">
					{products.map((product: any) => (
							<Product
								key={product.id}
								name={product.product.name}
								price={product.unit_amount}
								setSelect={setSelectedProducts}
							/>
					))}
				</aside>
			</div>

			<div className="secondContainer">
					<form action="http://127.0.0.1:8000/api/v1/stripe/customer-portal/" method="POST" className="checkoutForm">
						<h1>Your current plan</h1>
						<aside className="checkoutSummary">
							<ul className="checkoutSummaryList">

							</ul>

							<h4> Your bill: $10 </h4>
						</aside>
						<button id="checkout-and-portal-button" type="submit" className="submitBTN"> Cancel subsription </button>
					</form>

					<form action="http://127.0.0.1:8000/api/v1/stripe/create-checkout-session/" method="POST"
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

						<input type="hidden" name="price" value="price_1MUbfTEFKQV6TOkkIRfb745i" />
						<input type="hidden" name="price" value="price_1MUbYaEFKQV6TOkkaNSCPlfw" />
						<input type="hidden" name="customer_email" value="provaa@pp.com" />
						<button id="checkout-and-portal-button" type="submit" className="submitBTN">
							Change plan
						</button>
					</form>
				</div>
			</section>
		);
};

export default ProductDisplay;