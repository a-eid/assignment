import React from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native"

import Context from "../context"

class Home extends React.Component {
  static contextType = Context

  static navigationOptions = {
    title: "Pokemons",
    headerBackTitle: "Home",
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ height: 50, paddingHorizontal: 20, justifyContent: "center" }}
        onPress={() => this.navigateToDetailsScreen(item.name)}
      >
        <Text style={{ fontSize: 20 }}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  navigateToDetailsScreen = name => {
    const { navigation } = this.props
    navigation.navigate("Details", {
      name,
    })
  }

  renderSeperator() {
    return (
      <View
        style={{
          backgroundColor: "#eee",
          height: StyleSheet.hairlineWidth * 2,
        }}
      />
    )
  }

  renderLoader = () => {
    const { pokemons, loadingList } = this.context
    if (pokemons.length > 0 && loadingList) {
      return (
        <View
          style={{
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 2,
            elevation: 2,
          }}
        >
          <ActivityIndicator size="small" />
        </View>
      )
    }
  }

  render() {
    const { pokemons, loadingList, fetchNextPage } = this.context

    console.log({ pokemons, loadingList, fetchNextPage })

    if (pokemons.length === 0 && loadingList) {
      return <ActivityIndicator size="large" style={{ flex: 1 }} />
    }

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flexGrow: 1 }}
          data={pokemons}
          renderItem={this.renderItem}
          extraData={pokemons}
          keyExtractor={(_, i) => `${i}`}
          ItemSeparatorComponent={this.renderSeperator}
          removeClippedSubviews
          scrollEventThrottle={0.5}
          onEndReached={fetchNextPage}
        />
        {this.renderLoader()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {},
})

export default Home
