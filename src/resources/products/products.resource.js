import camelize from "camelize";

export const productsRequest = async (location) => {
  const res = await fetch(
    `http://845c-2804-14d-8083-8882-5915-360d-82fc-1b2e.ngrok.io/us-central1/placesNearby?location=${location}`
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
