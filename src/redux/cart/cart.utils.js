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

export const RemoveItemFromCart = (cartItems, itemToRemove) =>
  cartItems.flatMap( item => {
    return item.id !== itemToRemove.id
      ? item
      : item.quantity === 1
      ? item
      : { ...item, quantity: item.quantity - 1 };
  });

// export const RemoveItemFromCart = (cartItems, cartItemToRemove) => {
//   const existingCartItem = cartItems.find(
//     cartItem => cartItem.id === cartItemToRemove.id
//   );

//   if(existingCartItem.quantity === 1){
//     return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
//   }

//   return cartItems.map(cartItem => 
//     cartItem.id === cartItemToRemove.id
//     ?
//     { ...cartItem, quantity: cartItem.quantity -1 }
//     :
//     cartItem  
//   )
// }

