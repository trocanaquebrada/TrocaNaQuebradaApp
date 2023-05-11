import camelize from "camelize";

export const locationRequest = async (searchTerm) => {
  const res = await fetch(
    `http://751b-2804-7f0-bc41-1e8e-9836-e100-8133-7330.ngrok.io/trocanaquebrada-f3b2b/us-central1/geocode?city=${searchTerm}`
  );
  return await res.json();
};

export const locationTransform = (result) => {
  console.log(result);
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;

  return { lat, lng, viewport: geometry.viewport };
};
