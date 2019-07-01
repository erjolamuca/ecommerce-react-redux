const INITIAL_STATE = {
  items: [],
  totalPrice: 0
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SAVE":
      const { product, colour, size } = action.payload;
      const newCart = {
        items: addProductToCart(state, product, colour, size),
        totalPrice: state.totalPrice + product.price
      };
      console.log(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    // const newCart = [...state, action.payload];
    // localStorage.setItem("cart", JSON.stringify(newCart));
    // return newCart;

    case "REMOVE":
      const { item } = action.payload;
      const newCart_1 = {
        items: removeItemCart(state, item),
        totalPrice: state.totalPrice - item.price * item.amount
      };
      console.log(newCart_1);
      localStorage.setItem("cart", JSON.stringify(newCart_1));
      return newCart_1;
    case "REMOVE_ALL":
      localStorage.setItem("cart", JSON.stringify(INITIAL_STATE));
      return INITIAL_STATE;
    default:
      return state;
  }
};

const removeItemCart = (state, clickedItem) => {
  return state.items.filter(item => item !== clickedItem);
};

const addProductToCart = (state, product, colour, size) => {
  let existingItem = false;

  // CHECK FOR EXISTING ITEM TO INCREASE AMOUNT
  const newItems = state.items.map(item => {
    if (
      item.id === product.id &&
      item.colour === colour &&
      item.size === size
    ) {
      existingItem = true;
      return {
        ...item,
        amount: item.amount + 1
      };
    }

    return item;
  });

  // ADD NEW ITEM
  if (!existingItem) {
    newItems.push({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      colour,
      size,
      amount: 1
    });
  }

  return newItems;
};

export default cartReducer;

/*
CART MODEL
{
  items: [
    {
      id: productId,
      name: productName,
      image: productImage,
      price: productPrice,

      color: productColor,
      size: productSize,
      
      amount: cartItemAmount
    },
    {},
    ....
  ],
  totalPrice: 0
}

*/
