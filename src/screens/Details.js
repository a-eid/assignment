import React from "react"
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native"

import Context from "../context"

class Details extends React.Component {
  static contextType = Context

  static navigationOptions = ({ navigation }) => ({
    title: `Details about ${navigation.getParam("name")}`,
  })

  componentDidMount() {
    const { navigation } = this.props
    const { fetchPokemonDetails } = this.context
    const name = navigation.getParam("name")
    fetchPokemonDetails(name)
  }

  componentWillUnmount() {
    const { abortRequest } = this.context
    abortRequest()
  }

  render() {
    const { pokemonDetails, loadingDetails } = this.context
    const { navigation } = this.props
    const name = navigation.getParam("name")

    if (loadingDetails) {
      return <ActivityIndicator size="large" style={{ flex: 1 }} />
    }

    if (!pokemonDetails[name]) {
      // not sure if that's possible..
      return null
    }

    const {
      name: pName,
      height,
      weight,
      sprites,
      baseExperience,
    } = pokemonDetails[name]

    const { front_default } = sprites

    return (
      <View style={{ padding: 15 }}>
        <Text style={{ padding: 10 }}>name: {pName}</Text>
        <Text style={{ padding: 10 }}>Height: {height}</Text>
        <Text style={{ padding: 10 }}>Weight: {weight}</Text>
        <Text style={{ padding: 10 }}>Base Experience: {baseExperience}</Text>
        <Image
          source={{ uri: front_default }}
          style={{ height: 100, width: 100 }}
          resizeMode="cover"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {},
})

export default Details
