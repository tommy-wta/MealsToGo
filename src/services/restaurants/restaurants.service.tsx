import { err } from "react-native-svg";
import { mockImages, mocks } from "./mock";
import camelize from "camelize-ts";
import { Restaurant } from "../restaurants/restaurants.context";

export const restaurantsRequest = (
  location: string = "37.7749295,-122.4194155"
): Promise<Restaurant[]> => {
  console.log("In Restaurants Requests");
  return new Promise((resolve, reject) => {
    const mock = mocks[location];
    if (!mock) {
      console.log("NOT FOUND");
      reject("Not found");
    } else {
      console.log(`MOCK FOUND: ${mock}`);
      const transformedResults = mock.results.map((result) => ({
        name: result.name,
        rating: result.rating,
        vicinity: result.vicinity,
        opening_hours: result.opening_hours,
        business_status: result.business_status,
        //photos: result.photos.map((photo) => photo.photo_reference), // Extract only the photo references
        photos: result.photos.map((p) => {
          return mockImages[Math.ceil(Math.random() * mockImages.length)];
        }),
        geometry: result.geometry,
      }));
      resolve(transformedResults);
    }
  });
};

export const restaurantTransform = (
  result: Restaurant[] = [
    {
      name: "A",
      rating: 1,
      vicinity: "B",
      photos: [],
      geometry: {
        location: {
          lat: 37.77361,
          lng: -122.421622,
        },
        viewport: {
          northeast: {
            lat: 37.7750214302915,
            lng: -122.4202089697085,
          },
          southwest: {
            lat: 37.7723234697085,
            lng: -122.4229069302915,
          },
        },
      },
    },
  ]
) => {
  return result.map((restaurant) => {
    /*
    restaurant.photos = restaurant.photos.map((p) => {
      return mockImages[Math.ceil(Math.random() * mockImages.length)];
    });*/
    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours?.open_now ?? false,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
      photos: restaurant.photos,
    };
  });
};
