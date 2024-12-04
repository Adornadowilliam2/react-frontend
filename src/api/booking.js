import { url } from "./configuration";

export const store = async (body, token) => {
  const response = await fetch(`${url}/bookings/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};

export const index = async (token) => {
  const response = await fetch(`${url}/bookings/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};

export const update = async (body, token, id) => {
  const response = await fetch(`${url}/bookings/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};
