import { ApolloClient, InMemoryCache } from '@apollo/client';

const uri =
  process.env.NODE_ENV !== 'production'
    ? 'http://192.168.1.185:8000/graphql'
    : 'https://gilbertlc-api.herokuapp.com/graphql';

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});

export default client;
