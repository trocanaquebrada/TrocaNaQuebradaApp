import camelize from "camelize";

export const productsRequest = async (location) => {
  const res = await fetch(
    `http://e66f-2804-7f0-bc40-cbe5-145a-8243-a551-82da.ngrok.io/trocanaquebrada-f3b2b/us-central1/placesNearby?location=${location}`
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
