import camelize from "camelize";

export const productsRequest = async (location) => {
  const res = await fetch(
    `http://b310-2804-14d-8083-8882-f4f9-a50-e4bf-3ca7.ngrok.io/trocanaquebrada-f3b2b/us-central1/placesNearby?location=${location}`
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
