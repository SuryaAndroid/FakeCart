import { View, Text, StyleSheet, TextInput, ScrollView, Image, FlatList, Alert, TouchableHighlight, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppBar from "../components/AppBar";
import { AppColors, RouteNames, apiUrl, size } from "../utils/Utils";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default HomePage = () => {

    const navigation = useNavigation();

    // global
    const bannerAds = [
        "https://static.vecteezy.com/system/resources/thumbnails/004/707/493/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg",
        "https://static.vecteezy.com/system/resources/thumbnails/002/006/774/small/paper-art-shopping-online-on-smartphone-and-new-buy-sale-promotion-backgroud-for-banner-market-ecommerce-free-vector.jpg",
        "https://cdn3.f-cdn.com//files/download/186511195/shopping%20special.jpg?width=780&height=438&fit=crop"
    ];

    var [categories, setCategories] = useState([])
    var [products, setProducts] = useState([])

    useEffect(() => {

        // get categories from api
        fetch(`${apiUrl}products/categories`)
            .then(res => res?.json().then(json => setCategories(json)))
            .catch(err => console.log('err'))

        getProducts();

    }, [])

    //get products from API
    const getProducts = () => {

        fetch(`${apiUrl}products`)
            .then(res => res?.json().then(json => setProducts(json)))
            .catch(err => console.log('err'))

    }

    return (
        <View style={{ width:size.width , flex:1 }}>

            {/* app bar */}
            <AppBar title="Fake shop" navigation={navigation} leading={false} />

            <ScrollView>
                {/* search bar */}
                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Search..."
                        placeholderTextColor={'#ddd'}
                    />
                </View>

                {/* banner */}
                <View style={{ width: '100%' }}>
                    <FlatList
                        data={bannerAds}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, i }) => {
                            return (
                                <Image
                                    key={i} style={styles.bannerTile}
                                    source={{ uri: item }}
                                />
                            )
                        }}
                    />
                </View>

                {/* */}
                <Text style={styles.headerText}>Categories</Text>

                {/* categories */}
                <View style={{ paddingHorizontal: 15 }}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {
                            categories.map((item, index) => {
                                return (
                                    <View key={index} style={styles.categoryTile}>
                                        {/* <Image
                                            source={{ uri: item?.image }}
                                            style={styles.categoryImage}
                                        /> */}
                                        <Text style={{
                                            color: AppColors.black,
                                            fontSize:size.height*0.02
                                            //marginTop: 10
                                        }}>{item}</Text>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View>

                {/* */}
                <Text style={styles.headerText}>Products</Text>

                {/* products */}
                <FlatList
                    data={products}
                    scrollEnabled={false}
                    numColumns={2}
                    renderItem={({ item, i }) =>
                        <TouchableOpacity onPress={() => navigation.navigate(RouteNames.DetailPage,{data:item})}>
                            <View style={styles.productsTile}>
                                <Image
                                    source={{ uri: item?.image }}
                                    style={styles.productsImage}
                                />
                                <Text style={styles.productText} numberOfLines={1}>{item?.title}</Text>
                                <Text style={styles.productText} numberOfLines={1}>Rs.{item?.price}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    keyExtractor={(item) => item?.id}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        backgroundColor: AppColors.white,
        margin: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 10
    },
    headerText: {
        color: AppColors.black,
        marginHorizontal: 15,
        fontSize: size.height * 0.024,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    categoryTile: {
        margin: 10,
        alignItems: 'center',
        backgroundColor: AppColors.white,
        padding: 10,
        borderRadius: 5
    },
    categoryImage: {
        height: 100,
        width: 100,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    bannerTile: {
        backgroundColor: '#ddd',
        height: size.height * 0.12,
        width: size.width - 30,
        alignSelf: 'center',
        borderRadius: 20,
        margin: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    productsTile: {
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical:10,
        marginHorizontal:8,
        width:(size.width/2)-18
    },
    productsImage: {
        height: size.height * 0.23,
        margin: 8,
        backgroundColor: 'grey',
        borderRadius: 10
    },
    productText: {
        color: AppColors.black,
        marginHorizontal: 10,
        marginVertical: 7
    }
})