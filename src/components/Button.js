import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppColors, size } from "../utils/Utils";

export default Button = (props) => {

    const { text, onTap, margin } = props;

    return (
        <TouchableOpacity onPress={()=>onTap()} style={[styles.buttonContainer, { margin: margin }]}>
            <View>
                <Text style={styles.textStyle}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: AppColors.primary,
        height: 50,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth:1,
        borderColor:'#ddd'
    },
    textStyle:{
        color:AppColors.white,
        fontSize:size.height*0.02,
        fontWeight:'bold'
    }
})