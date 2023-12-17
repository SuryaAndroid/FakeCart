import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, StatusBar } from "react-native";
import { AppColors, RouteNames } from "./src/utils/Utils";
import HomePage from "./src/pages/HomePage";
import DetailPage from "./src/pages/DetailPage";
import BottomNavigation from "./src/pages/BottomNavigation";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import CheckoutPage from "./src/pages/CheckoutPage";

const Stack = createNativeStackNavigator();
const rootStore = store()

export default App = () => <Provider store={rootStore}>

  <NavigationContainer>
    <StatusBar backgroundColor={AppColors.primary} />

    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name={RouteNames.BottomTab} component={BottomNavigation} />
      <Stack.Screen name={RouteNames.DetailPage} component={DetailPage} />
      <Stack.Screen name={RouteNames.CheckoutPage} component={CheckoutPage} />
    </Stack.Navigator>
  </NavigationContainer>

</Provider>