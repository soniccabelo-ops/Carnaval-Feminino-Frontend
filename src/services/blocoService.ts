import api from "./api";

export const createBloco = async (data: any) => {
  const token = localStorage.getItem("token");
  const res = await api.post("/blocos", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getBlocos = async () => {
  const res = await api.get("/blocos");
  return res.data;
};