import { useState,useEffect } from 'react'
import  {db} from './../Database/db'
import { useMemo } from "react"

export const useCart = () => {

    const initialCart = () =>{
        const localStorageCart = localStorage.getItem('cart')

        return localStorageCart ? JSON.parse(localStorageCart) : []
    }
    const [database] = useState(db)
    const [cart, setCart] = useState(initialCart)
    const MIN_ITEMS = 1

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

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

    function cartIncreaseQuantity(id){
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

    function cartDecreaseQuantity(id){
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

    function clearCart(){ 
        setCart([])
    }

    //state derivado
    //use memo hace que el codigo se ejecute cuando hay un cambio en cart
    const isEmpty = useMemo( () => cart.length === 0,[cart] )
    const cartTotal = useMemo( () => cart.reduce((total, item) => total + (item.quantity * item.price),0) , [cart])

    return {
        database,
        cart,
        addToCart,
        removeFromCart,
        cartIncreaseQuantity,
        cartDecreaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
}