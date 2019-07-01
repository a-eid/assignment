import { createStackNavigator, createAppContainer } from "react-navigation"
import { Home, Details } from "./screens"

const navigator = createStackNavigator({
  Home,
  Details,
})

export default createAppContainer(navigator)