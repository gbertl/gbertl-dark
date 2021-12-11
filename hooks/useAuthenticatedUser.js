import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { checkExpiredToken } from '../utils';
import * as api from '../api';
import Cookies from 'universal-cookie';

const useAuthenticatedUser = () => {
  const router = useRouter();
  const cookies = new Cookies();

  useEffect(() => {
    const tokenExpired = checkExpiredToken(cookies.get('accessToken'));

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
