import camelize from "camelize";

export const productsRequest = async (location) => {
  const res = await fetch(
    `http://69ab-2804-14d-8083-8882-78f9-ca3e-84d8-f977.ngrok.io/us-central1/placesNearby?location=${location}`
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
