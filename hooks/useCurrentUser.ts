import { IUser } from '@/types/common';
import { useQuery } from '@tanstack/react-query';

const useCurrentUser = (options?: object) => {
  const { data } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await fetch('/api/currentUser');
      const data = await response.json();
      return data.data as IUser;
    },
    refetchOnWindowFocus: false,
    ...options,
  });

  return data;
};

export default useCurrentUser;