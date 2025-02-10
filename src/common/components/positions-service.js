import { API_URL } from "../constants/env-constants";
import { PositionsByIdUrl, PositionsUrl } from "./api-routes";

export const GetAllPositions = async (signal) => {
  const response = await fetch(`${API_URL}${PositionsUrl.get()}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
    signal,
  });
  const { data } = await response.json();
  return data;
};

export const CreatePosition = async (position, signal) => {
  const response = await fetch(`${API_URL}${PositionsUrl.post(position.id)}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(position),
    signal,
  });
  const { data } = await response.json();
  return data;
};

export const UpdatePositionById = async (position, signal) => {
  const response = await fetch(
    `${API_URL}${PositionsByIdUrl.put(position.id)}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(position),
      signal,
    }
  );
  const { data } = await response.json();
  return data;
};

export const DeletePositionById = async (positionId, signal) => {
  const response = await fetch(
    `${API_URL}${PositionsByIdUrl.delete(positionId)}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
      signal,
    }
  );
  const { data } = await response.json();
  return data;
};
