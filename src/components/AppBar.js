import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import MatiIcon from 'react-native-vector-icons/MaterialIcons';
import { AppColors } from "../utils/Utils";

export default AppBar = (props) => {

    const { title, navigation, leading } = props;

    return (
        <View style={styles.container}>
            {
                leading?
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <View style={{ flexDirection: 'row' }}>
                        <MatiIcon name="arrow-back" color={'#fff'} size={25} />
                        <View style={{ width: 20 }} />
                    </View>
                </TouchableOpacity>:<></>
            }
            <Text style={styles.titleTextStyle}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:AppColors.primary,
        height: 55,
        paddingHorizontal: 15
    },
    titleTextStyle: {
        color:AppColors.white,
        fontSize: 18,
        fontWeight: 'bold',
        elevation: 2
    }
})