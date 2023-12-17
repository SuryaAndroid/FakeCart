import { Dimensions } from "react-native"

export const RouteNames = {
    HomePage:'HomePage',
    CartPage:'CartPage',
    DetailPage:'DetailPage',
    CheckoutPage:'CheckoutPage',
    BottomTab:'BottomTab',
}

export const AppColors = {
    primary:'#563EBF',
    black:'#000',
    white:'#FFF',
}

//media query (device size)
export const size = Dimensions.get('window');

export const apiUrl = 'https://fakestoreapi.com/';