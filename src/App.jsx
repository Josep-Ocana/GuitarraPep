import { useState } from 'react';
import Footer from './components/Footer';
import Guitar from './components/Guitar';
import Header from './components/Header';
import { db } from './data/db';

function App() {
	const [data, setData] = useState(db);
	const [cart, setCart] = useState([]);

	const MAX_ITEMS = 5;
	const MIN_ITEMS = 1;

	function addToCart(item) {
		const itemExist = cart.findIndex(guitar => guitar.id === item.id);

		if (itemExist !== -1) {
			if (item.quantity < MAX_ITEMS) {
				// Existe en el carrito
				const updatedCart = [...cart];
				updatedCart[itemExist].quantity++;
				setCart(updatedCart);
			}
		} else {
			item.quantity = 1;
			setCart([...cart, item]);
		}
	}

	function removeFromCart(id) {
		setCart(prevCart => prevCart.filter(item => item.id !== id));
	}

	function decreaseQuantity(id) {
		const updatedCart = [...cart];
		updatedCart.map(item => {
			if ((item.id === id) & (item.quantity > MIN_ITEMS)) {
				item.quantity--;
				setCart(updatedCart);
			}
		});
	}

	function clearCart() {
		setCart([]);
	}

	function increaseQuantity(id) {
		const updatedCart = [...cart];
		updatedCart.map(item => {
			if (item.id === id && item.quantity < MAX_ITEMS) {
				item.quantity++;
				setCart(updatedCart);
			}
		});
	}

	return (
		<>
			<Header
				cart={cart}
				removeFromCart={removeFromCart}
				decreaseQuantity={decreaseQuantity}
				increaseQuantity={increaseQuantity}
				clearCart={clearCart}
			/>
			<main className="container-xl mt-5">
				<h2 className="text-center">Nuestra Colección</h2>

				<div className="row mt-5">
					{data.map(guitar => (
						<Guitar
							key={guitar.id}
							guitar={guitar}
							setCart={setCart}
							addToCart={addToCart}
						/>
					))}
				</div>
			</main>

			<Footer />
		</>
	);
}

export default App;
