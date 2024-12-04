import { url } from "./configuration";

export const retrieveRoom = async (token) => {
  const response = await fetch(`${url}/rooms/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};
