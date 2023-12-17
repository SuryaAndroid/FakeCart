import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import AppBar from "../components/AppBar";
import { AppColors, size } from "../utils/Utils";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { CartActions } from "../redux/actions";
import { useEffect, useState } from "react";

export default DetailPage = ({ navigation, route }) => {

    const data = route?.params?.data;

    // redux helpers
    const dispatch = useDispatch();
    const { cartList } = useSelector((state) => state.CartReducer)

    //helpers
    var [cartCount, setartCount] = useState(1);

    //cart methods
    const handleCartAdd = () => {


        if (cartList?.findIndex(e => e?.id === data?.id) !== -1) {

            const updatable = cartList?.map((e) => {
                if (e?.id === data?.id) {
                    return { ...e, count: cartCount };
                }
                return e;
            })

            dispatch({
                type: CartActions.ADD_ITEM,
                payload: updatable
            })

        } else {

            const currData = { ...data, count: cartCount };
            const payload = [...cartList, currData]

            dispatch({
                type: CartActions.ADD_ITEM,
                payload: payload
            })

        }

    }

    useEffect(() => {

        // set from redux..
        setartCount(cartList[cartList?.findIndex(e => e?.id === data?.id)]?.count??1);

    }, [cartList])

    return (
        <View style={{ height: size.height, width: size.width }}>
            {/* app bar */}
            <AppBar title={"Details"} navigation={navigation} leading={true} />
            <View style={styles.container}>
                <ScrollView>
                    {/* image */}
                    <Image
                        source={{ uri: `${data?.image}` }}
                        style={styles.productImage}
                    />

                    {/* price and count */}
                    <View style={styles.priceRow}>

                        <Text style={styles.priceText}>Rs.{data?.price}</Text>

                        {/* counter */}
                        <View style={styles.counterRow}>

                            <TouchableOpacity onPress={() => {
                                if (cartCount > 1) {
                                    setartCount(cartCount - 1);
                                }
                            }}>
                                <View style={styles.circle}><Text style={styles.counterBtnTxt}>-</Text></View>
                            </TouchableOpacity>

                            <Text style={styles.counterText}>{cartCount < 10 ? `0${cartCount}` : cartCount}</Text>

                            <TouchableOpacity onPress={() => {
                                setartCount(cartCount + 1);
                            }}>
                                <View style={styles.circle}><Text style={styles.counterBtnTxt}>+</Text></View>
                            </TouchableOpacity>

                        </View>

                    </View>

                    <Text style={styles.productName}>{data?.title}</Text>
                    <Text style={styles.productDescription}>{data?.description}</Text>
                </ScrollView>
                <Button text={cartList?.findIndex(e => e?.id === data?.id) !== -1?"Update Cart":"Add to Cart"} onTap={() => {
                    handleCartAdd()
                }} margin={15} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    productImage: {
        height: size.height * 0.4,
        backgroundColor: '#ddd',
        margin: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    productName: {
        color: AppColors.black,
        fontSize: size.height * 0.023,
        marginHorizontal: 15,
        marginVertical: 8
    },
    productDescription: {
        color: 'grey',
        fontSize: size.height * 0.019,
        marginHorizontal: 15,
        marginVertical: 8
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    priceText: {
        color: AppColors.black,
        fontSize: size.height * 0.025,
        fontWeight: 'bold'
    },
    counterRow: {
        flexDirection: 'row',
        alignItems: 'center'
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