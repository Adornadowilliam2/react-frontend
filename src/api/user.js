import { url } from "./configuration";

export const retrieveUser = async (token) => {
  const response = await fetch(`${url}/users/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};
