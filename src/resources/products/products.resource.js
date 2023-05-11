import camelize from "camelize";

export const productsRequest = async (location) => {
  const res = await fetch(
    `http://751b-2804-7f0-bc41-1e8e-9836-e100-8133-7330.ngrok.io/trocanaquebrada-f3b2b/us-central1/placesNearby?location=${location}`
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
