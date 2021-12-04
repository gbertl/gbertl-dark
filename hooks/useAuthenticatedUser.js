import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { checkExpiredToken } from '../utils';
import * as api from '../api';

const useAuthenticatedUser = () => {
  const router = useRouter();

  useEffect(() => {
    const tokenExpired = checkExpiredToken();

    if (tokenExpired) {
      const doRefresh = async () => {
        try {
          await api.refreshToken();
        } catch {
          router.push({
            pathname: '/login',
            query: { ...router.query, goBack: router.pathname },
          });
        }
      };
      doRefresh();
    }
  }, []);
};

export default useAuthenticatedUser;
