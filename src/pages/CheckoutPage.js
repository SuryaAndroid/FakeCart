import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import AppBar from "../components/AppBar";
import { AppColors, RouteNames, size } from "../utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { CartActions } from "../redux/actions";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";


export default CheckoutPg = ({ navigation, route }) => {

    cartList = route?.params?.data ?? [];

    var [totalCount, setTotalCount] = useState(0);
    var [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {

        setTotalCount(0)
        setTotalPrice(0)

        if (cartList) {
            cartList?.forEach((e) => {
                setTotalCount(totalCount = totalCount + e?.count)
                setTotalPrice(totalPrice = totalPrice + (parseFloat(e?.price)*e?.count))
            })
        }

    }, [])

    return (
        <View style={{ height: size.height, width: size.width }}>

            {/* app bar */}
            <AppBar title={"Checkout"} navigation={navigation} leading />

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
                                        <Text numberOfLines={1} style={styles.listProductName}>Rs.{parseFloat(item?.price) * item?.count}</Text>
                                    </View>

                                    {/* counter */}
                                    <Text style={styles.counterText}>X {item?.count}</Text>


                                </View>
                            )
                        })
                    }
                </ScrollView>

                <View>
                    <View style={styles.footerRow}>
                        <Text style={styles.footerText}>Total price</Text>
                        <Text style={[styles.footerText, { fontWeight: 'bold', }]}>Rs.{parseInt(totalPrice)}</Text>
                    </View>
                </View>

                <View>
                    <View style={styles.footerRow}>
                        <Text style={styles.footerText}>Total items</Text>
                        <Text style={[styles.footerText, { fontWeight: 'bold', }]}>{totalCount}</Text>
                    </View>
                </View>


                <View style={{ marginBottom: 10 }}>
                    <Button
                        text={`Continue`}
                        margin={15}
                        onTap={() => alert('Order placed :)')}
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
    },
    footerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginVertical: 15
    },
    footerText: {
        color: AppColors.black,
        fontSize: size.height * 0.023
    }
})