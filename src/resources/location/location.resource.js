import camelize from "camelize";

export const locationRequest = async (searchTerm) => {
  const res = await fetch(
    `http://e66f-2804-7f0-bc40-cbe5-145a-8243-a551-82da.ngrok.io/trocanaquebrada-f3b2b/us-central1/geocode?city=${searchTerm}`
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
