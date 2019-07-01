export const save = (product, colour, size) => {
  return {
    type: "SAVE",
    payload: { product, colour, size }
  };
};

export const remove = item => {
  return {
    type: "REMOVE",
    payload: { item }
  };
};

export const removeAll = () => {
  return {
    type: "REMOVE_ALL"
  };
};
