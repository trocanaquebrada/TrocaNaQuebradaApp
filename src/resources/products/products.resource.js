import camelize from "camelize";

export const productsRequest = async (location) => {
  const res = await fetch(
    `http://localhost/trocanaquebrada-f3b2b/us-central1/placesNearby?location=${location}`
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
