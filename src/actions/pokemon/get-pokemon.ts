import ApolloClient, { gql } from "apollo-boost";
import { POKEMON1_FETCHED } from "../../reducers/pokemon1";
import { POKEMON2_FETCHED } from "../../reducers/pokemon2";

const client = new ApolloClient({
  uri: "http://localhost:4011/graphql"
});



export function fetchPokemon(id1: number, id2: number) {
  return function(dispatch) {

    client
    .query({
      query: gql`
        {
          pokemon(id: 1) {
            name
          }
        }
      `
    })
    .then((res: any) => {
      dispatch({
        type: POKEMON1_FETCHED,
        payload: res.data.pokemon
      });
    });

    client
    .query({
      query: gql`
        {
          pokemon(id: 2) {
            name
          }
        }
      `
    })
    .then((res: any) => {
      dispatch({
        type: POKEMON2_FETCHED,
        payload: res.data.pokemon
      });
    });
  };
}