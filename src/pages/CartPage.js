import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import AppBar from "../components/AppBar";
import { AppColors, RouteNames, size } from "../utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { CartActions } from "../redux/actions";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";


export default CartPage = () => {

    const navigation = useNavigation();

    // redux helpers
    const dispatch = useDispatch();
    const { cartList } = useSelector((state) => state.CartReducer)

    //logics
    const removeItem = (id) => {
        const deleted = cartList?.filter(e => e?.id !== id);
        dispatch({
            type: CartActions.ADD_ITEM,
            payload: deleted
        })
    }

    const handleCartAdd = (id) => {

        const update = cartList?.map((e) => {

            if (e?.id === id) {
                return { ...e, count: e?.count + 1 }
            }

            return e;
        })

        dispatch({
            type: CartActions.ADD_ITEM,
            payload: update
        })

    }

    const handleCartDecrease = (id) => {

        const update = cartList?.map((e) => {

            if (e?.id === id) {
                if (e?.count > 1) {
                    return { ...e, count: e?.count - 1 }
                }
            }

            return e;
        })

        dispatch({
            type: CartActions.ADD_ITEM,
            payload: update
        })

    }

    const handleGoToCheckout = () => {

        // if(cartList?.length > 0) {

            navigation.navigate(RouteNames.CheckoutPage,{data:cartList})

        // }else {
        //     alert('No items in cart!')
        // }

    }

    return (
        <View style={{ height: size.height, width: size.width }}>

            {/* app bar */}
            <AppBar title={"Cart"} navigation={navigation} />

            <View style={styles.container}>

                <ScrollView>
                    {
                        cartList?.map((item, i) => {
                            return (
                                <View style={styles.listTile} key={i}>

                                    <Image
                                        source={{ uri: item?.image }}
                                        style={styles.listImage}
                                    />

                                    <View style={styles.listTileColumn}>
                                        <Text numberOfLines={1} style={styles.listProductName}>{item?.title}</Text>
                                        <Text numberOfLines={1} style={styles.listProductName}>Rs.{parseFloat(item?.price)*item?.count}</Text>
                                        {/* counter */}
                                        <View style={styles.counterRow}>

                                            <TouchableOpacity onPress={() => handleCartDecrease(item?.id)}>
                                                <View style={styles.circle}><Text style={styles.counterBtnTxt}>-</Text></View>
                                            </TouchableOpacity>

                                            <Text style={styles.counterText}>{item?.count}</Text>

                                            <TouchableOpacity onPress={() => handleCartAdd(item?.id)}>
                                                <View style={styles.circle}><Text style={styles.counterBtnTxt}>+</Text></View>
                                            </TouchableOpacity>

                                        </View>
                                    </View>

                                    <TouchableOpacity onPress={() => removeItem(item?.id)}>

                                        <MIcon name="delete" color={AppColors.primary} size={size.height * 0.035} />

                                    </TouchableOpacity>

                                </View>
                            )
                        })
                    }
                </ScrollView>

                <View style={{ marginBottom: size.height*0.1 }}>
                    <Button
                        text={`Checkout (${cartList?.length}) items`}
                        margin={15}
                        onTap={() => handleGoToCheckout()}
                    />
                </View>


            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listTile: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: AppColors.white,
        margin: 10,
        borderRadius: 10,
        padding: 10
    },
    listImage: {
        height: size.height * 0.12,
        width: size.height * 0.12,
        backgroundColor: '#ddd',
        borderRadius: 5
    },
    listTileColumn: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
    listProductName: {
        color: AppColors.black,
        fontSize: size.height * 0.02,
        fontWeight: 'bold',
        marginVertical: 5
    },
    counterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    circle: {
        height: 35,
        width: 35,
        borderRadius: 70 / 2,
        borderWidth: 1,
        borderColor: AppColors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    counterBtnTxt: {
        color: AppColors.black,
        fontSize: size.height * 0.025,
        fontWeight: 'bold'
    },
    counterText: {
        color: AppColors.black,
        fontSize: size.height * 0.03,
        fontWeight: 'bold',
        marginHorizontal: 10
    }
})