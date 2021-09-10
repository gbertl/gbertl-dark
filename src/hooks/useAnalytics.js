import { useEffect } from 'react';
import { firebaseAnalytics } from '../firebase';

const useAnalytics = (pageTitle) => {
  useEffect(() => {
    firebaseAnalytics.logEvent(`${pageTitle} page visited`);
  }, []);
};

export default useAnalytics;
