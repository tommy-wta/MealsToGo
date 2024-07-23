import camelize from "camelize-ts";
import { locations, Geometry, City } from "./location.mock";

export const locationRequest = (searchTerm: string): Promise<City> => {
  return new Promise((resolve, reject) => {
    const locationMock = locations[searchTerm];
    console.log(locationMock);
    if (!locationMock) {
      reject("NOT FOUND");
    }
    resolve(locationMock);
  });
};

export const locationTransform = (searchResult: City) => {
  const formattedResponse = camelize(searchResult);
  const geometry = formattedResponse.results[0];
  const { lat, lng } = geometry.geometry.location;
  console.log({ lat, lng });
  return { lat, lng };
};
