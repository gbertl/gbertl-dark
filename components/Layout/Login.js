import { useRouter } from 'next/router';
import { useRef } from 'react';

import * as api from '../../api';
import classes from './login.module.css';

const Login = () => {
  const usernameRef = useRef('');
  const passwordRef = useRef('');

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await api.login({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });

      e.target.reset();

      const query = { ...router.query };
      delete query.goBack;

      router.replace({
        pathname: router.query.goBack ? router.query.goBack : '/admin/projects',
        query,
      });
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div
      className={classes.login}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" ref={usernameRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
