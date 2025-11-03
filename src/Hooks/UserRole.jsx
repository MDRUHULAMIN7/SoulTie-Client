// useUserRole.jsx
import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import UseAxiosPublic from "./UseAxiosPublic";

const useUserRole = () => {
  const { user, loading } = UseAuth();
  const axiosPublic = UseAxiosPublic();

  const { data: role = [], isLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosPublic.get(`/user/${user?.email}`);
      return [res.data.roll, res.data.role];
    },
  });

  return [role, isLoading];
};

export default useUserRole;
