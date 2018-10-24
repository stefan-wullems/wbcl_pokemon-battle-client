import { IFetchParams, IPokemon } from "../../tools/interfaces";
import ApolloClient, { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:4011/graphql"
});

export const SET_PLAYER_PARTY = "SET_PLAYER_PARTY";
export const SET_OPPONENT_PARTY = "SET_OPPONENT_PARTY";

export default function({ playerPartyIds, opponentPartyIds }: IFetchParams) {
  return async function(dispatch) {
    const playerParty = await mapPokemonToId(playerPartyIds);

    dispatch({
      type: SET_PLAYER_PARTY,
      payload: playerParty
    });
    const opponentParty = await mapPokemonToId(opponentPartyIds);
    dispatch({
      type: SET_OPPONENT_PARTY,
      payload: opponentParty
    });
  };
}

async function mapPokemonToId(partyIds: number[]): Promise<IPokemon[]> {
  const party: IPokemon[] = [];
  for (let i = 0; i < partyIds.length; i++) {
    await queryForPokemon(partyIds[i]).then((res: any) => {
      const pokemon: IPokemon = res.data.pokemon;
      pokemon.status = "fit";
      party.push(pokemon);
    });
  }
  return party;
}

function queryForPokemon(id) {
  return client.query({
    query: gql`
        {
          pokemon(id: ${id}) {
            name
            id
            primaryType
            secondaryType
            stats{
              hp
              attack
              defense
              speed
            }
            moves{
              name
              damage
              accuracy
              type
              pp
              priority
            }
          }
        }
      `
  });
}
