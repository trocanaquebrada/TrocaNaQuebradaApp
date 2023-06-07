import camelize from "camelize";

export const locationRequest = async (searchTerm) => {
  const res = await fetch(
    `https://us-central1-trocanaquebrada-f3b2b.cloudfunctions.net/geocode?city=${searchTerm}`
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
