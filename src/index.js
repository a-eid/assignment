import React from "react"
import axios from "axios"
import Navigator from "./navigator"
import Context from "./context"

const LIMIT = 20

function transformPokemon(p) {
  return {
    height: p.height,
    weight: 85,
    sprites: p.sprites,
    name: p.name,
    baseExperience: p.base_experience,
  }
}

export default class App extends React.Component {
  state = {
    page: 0,
    loadingList: false,
    loadingDetails: false,
    pokemons: [],
    pokemonDetails: {},
  }

  abortRequest = () => {
    this.source && this.source.cancel && this.source.cancel("")
    this.setState({
      loadingDetails: false,
    })
  }

  fetchPokemonDetails = name => {
    const { pokemonDetails } = this.state

    this.CancelToken = axios.CancelToken
    this.source = this.CancelToken.source()

    if (!pokemonDetails[name]) {
      this.setState({ loadingDetails: true })
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${name}`, {
          cancelToken: this.source.token,
        })
        .then(res => {
          this.setState(state => ({
            loadingDetails: false,
            pokemonDetails: {
              ...state.pokemonDetails,
              [name]: transformPokemon(res.data),
            },
          }))
        })
    }
  }

  fetchNextPage = () => {
    const { page } = this.state
    this.setState({ loadingList: true })
    axios
      .get(
        `https://pokeapi.co/api/v2/pokemon/?offset=${page *
          LIMIT}&limit=${LIMIT}`,
      )

      .then(res => {
        const { results = [] } = res.data
        this.setState(state => ({
          pokemons: [...state.pokemons, ...results],
          loadingList: false,
          page: state.page + 1,
        }))
      })
      .catch(console.warn)
  }

  componentDidMount() {
    this.fetchNextPage()
  }

  render() {
    const { fetchNextPage, fetchPokemonDetails, abortRequest } = this
    return (
      <Context.Provider
        value={{
          ...this.state,
          fetchNextPage,
          fetchPokemonDetails,
          abortRequest,
        }}
      >
        <Navigator />
      </Context.Provider>
    )
  }
}
