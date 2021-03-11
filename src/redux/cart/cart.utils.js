// Utity functions allows us to keep our files clean 
// and organize functions that we may need in multiple files in one location

export const AddItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    // find() will return the first matching item
    cartItem => cartItem.id === cartItemToAdd.id
  );

  if(existingCartItem){
    return cartItems.map( cartItem => 
      cartItem.id === cartItemToAdd.id
      ?
      { ...cartItem, quantity: cartItem.quantity + 1 }
      : 
      cartItem
    )
  }
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }]   
}