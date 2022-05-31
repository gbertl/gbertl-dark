import client from './apollo-client';
import { gql } from '@apollo/client';

export const getProjects = () =>
  client.query({
    query: gql`
      query {
        projects(orderBy: ["priority_order"]) {
          title
          description
          livePreview
          sourceCode
          technologyList
          categoryList
          screenshotList(orderBy: ["priority_order"])
        }
      }
    `,
  });

export const getCategories = () =>
  client.query({
    query: gql`
      query {
        categories(orderBy: ["priority_order"]) {
          name
          title
        }
      }
    `,
  });
