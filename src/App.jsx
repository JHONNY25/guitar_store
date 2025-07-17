import { useState,useEffect } from 'react'
import  Header from './Components/Header'
import  Collection from './Components/Collection'
import  Footer from './Components/Footer'
import  {db} from './Database/db'

function App() {
  const [database, setDatabase] = useState(db)
  const [cart, setCart] = useState([])
  const MIN_ITEMS = 1

  function addToCart(item){
    const itemExist = cart.findIndex(guitar => guitar.id === item.id)

    if(itemExist >= 0){ //exist in the cart
        const updatedCart = [...cart]
        updatedCart[itemExist].quantity++
        setCart(updatedCart)
    }else{
        item.quantity = 1
        setCart([...cart, item])
    }
  }

  function removeFromCart(id){
    //solo deja los articulos diferentes al que elimine
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function cartIncrement(id){
    const updatedCart = cart.map(item => {
        if(item.id === id){
            return {
                ...item,
                quantity: item.quantity + 1
            }
        }
        return item
    })
    setCart(updatedCart)
  }

  function cartDecrement(id){
    const updatedCart = cart.map(item => {
        if(item.id === id && item.quantity > MIN_ITEMS){
            return {
                ...item,
                quantity: item.quantity - 1
            }
        }
        return item
    })
    setCart(updatedCart)
  }

  function cleanCart(){ 
    setCart([])
  }

  return (
    <>
        <Header cart={cart} removeFromCart={removeFromCart} cartIncrement={cartIncrement} cartDecrement={cartDecrement} cleanCart={cleanCart} />

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
