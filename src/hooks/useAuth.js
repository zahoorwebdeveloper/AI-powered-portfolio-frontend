// hooks/useAuth.js
import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios.js";

export default function useAuth() {
  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const { data } = await api.get("/verify");
      return data;
    },
    retry: false,
    staleTime: 1000 * 60 * 10,
  });
}