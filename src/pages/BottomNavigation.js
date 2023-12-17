import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HomePage from "./HomePage";
import CartPage from "./CartPage";
import { AppColors, size } from "../utils/Utils";
import MatiIcons from 'react-native-vector-icons/MaterialIcons'
import { useState } from "react";
import { useSelector } from "react-redux";
import Profile from "./Profile";

export default BottomNavigationPage = ({navigation}) => {

    var [index, setIndex] = useState(0);
    const { cartList } = useSelector((state) => state.CartReducer)

    return (
        <View style={styles.container}>

            {/* body */}
            <View style={styles.body}>
                {
                    index === 0?
                    <HomePage/>:<></>
                }
                {
                    index === 1?
                    <CartPage/>:<></>
                }
                {
                    index === 2?
                    <Profile/>:<></>
                }
            </View>

            {/* bottom bar */}
            <View style={styles.bottomBar}>
                <TabBarItem
                    title={"Home"}
                    iconName={'home'}
                    index={0}
                    current={index}
                    onTap={(e) => setIndex(e)}
                />
                <TabBarItem
                    title={"Cart"}
                    iconName={'shopping-cart'}
                    index={1}
                    current={index}
                    onTap={(e) => setIndex(e)}
                    badge={cartList?.length>0?1:0}
                />
                <TabBarItem
                    title={"Profile"}
                    iconName={'account-circle'}
                    index={2}
                    current={index}
                    onTap={(e) => setIndex(e)}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: size.height,
        width: size.width
    },
    body: {
        flex: 1,
    },
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        paddingVertical: 15
    }
})

const TabBarItem = ({ title, iconName, index, current, onTap , badge}) => {
    return (
        <TouchableOpacity onPress={() => onTap(index)}>
            <View style={tabStyles.tabView}>
                <MatiIcons name={iconName} color={index === current?AppColors.primary:AppColors.black} size={size.height * 0.035} />
                <Text style={[tabStyles.tabText,{color:index === current?AppColors.primary:AppColors.black}]}>{title}</Text>
                {badge?
                <View style={tabStyles.badgeStyle}/>:<></>}
            </View>
        </TouchableOpacity>
    )
}

const tabStyles = StyleSheet.create({
    tabView: {
        alignItems: 'center'
    },
    tabText: {
        marginTop: 2
    },
    badgeStyle:{
        height:10,
        width:10,
        borderRadius:20/2,
        backgroundColor:'red',
        position:'absolute',
        right:0,
        top:0,
        alignItems:'center',
        justifyContent:'center'
    }
})