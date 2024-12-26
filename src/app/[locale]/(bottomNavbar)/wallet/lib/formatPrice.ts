/* eslint-disable no-unused-vars */
export const formatPrice = (price: number) => {
  let formattedPrice: string;
  if (price >= 1000000) {
    return (formattedPrice = price / 1000000 + " million");
  }
  if (price >= 100000 && price < 1000000) {
    return (formattedPrice = price / 1000 + ",000");
  }
  if (price >= 1000 && price < 10000) {
    return (formattedPrice = price / 1000 + ",000");
  }
  return price;
};
