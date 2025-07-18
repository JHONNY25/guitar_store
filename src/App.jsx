
import  Header from './Components/Header'
import  Collection from './Components/Collection'
import  Footer from './Components/Footer'
import  { useCart } from './Hooks/useCart'

function App() {
    
  const { database, cart, addToCart, removeFromCart, cartIncreaseQuantity, cartDecreaseQuantity, clearCart, isEmpty, cartTotal } = useCart()

  return (
    <>
        <Header cart={cart} removeFromCart={removeFromCart} cartIncreaseQuantity={cartIncreaseQuantity} cartDecreaseQuantity={cartDecreaseQuantity} clearCart={clearCart} isEmpty={isEmpty} cartTotal={cartTotal} />

        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>
 
            <div className="row mt-5">
                { 
                    database.map((guitar) =>(
                        <Collection key={ guitar.id }
                            guitar={guitar}
                            addToCart = {addToCart}
                        />
                    ))
                }
            </div>
        </main>

        <Footer/> 
    </>
  )
}

export default App
