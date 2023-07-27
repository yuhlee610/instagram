import { IUser } from '@/types/common';
import { useQuery } from '@tanstack/react-query';

const useCurrentUser = () => {
  const { data } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await fetch('/api/currentUser');
      const data = await response.json();
      return data.data as IUser;
    },
  });

  return data;
};

export default useCurrentUser;