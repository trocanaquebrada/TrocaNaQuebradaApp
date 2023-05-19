import camelize from "camelize";

export const productsRequest = async (location) => {
  const res = await fetch(
    `https://us-central1-trocanaquebrada-f3b2b.cloudfunctions.net/placesNearby/us-central1/placesNearby?location=${location}`
  );
  return await res.json();
};

export const productsTransform = ({ results = [] }) => {
  const mappedResults = results.map((product) => {
    return {
      ...product,
      address: product.vicinity,
    };
  });

  return camelize(mappedResults);
};
