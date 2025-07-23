// src/api/orders
import axios from "axios";

export const saveOrder = async (orderData, token) => {
  const res = await axios.post("/api/orders", orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
