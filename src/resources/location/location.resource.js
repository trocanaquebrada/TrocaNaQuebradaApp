import camelize from "camelize";

export const locationRequest = async (searchTerm) => {
  const res = await fetch(
    `http://845c-2804-14d-8083-8882-5915-360d-82fc-1b2e.ngrok.io/trocanaquebrada-f3b2b/us-central1/geocode?city=${searchTerm}`
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
