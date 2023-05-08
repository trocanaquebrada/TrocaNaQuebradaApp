import camelize from "camelize";

export const locationRequest = async (searchTerm) => {
  const res = await fetch(
<<<<<<< HEAD
    `http://b310-2804-14d-8083-8882-f4f9-a50-e4bf-3ca7.ngrok.io/trocanaquebrada-f3b2b/us-central1/geocode?city=${searchTerm}`
=======
    `http://e66f-2804-7f0-bc40-cbe5-145a-8243-a551-82da.ngrok.io/trocanaquebrada-f3b2b/us-central1/geocode?city=${searchTerm}`
>>>>>>> cf8c967fea2c2b3ee5627eb1cc9f7d11a9f503e5
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
