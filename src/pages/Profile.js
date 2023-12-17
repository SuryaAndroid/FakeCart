import { View , Text} from 'react-native';
import { size } from '../utils/Utils';

export default Profile = () => {
    return (
        <View style={{
            height:size.height,
            width:size.width,
            justifyContent:'center',
            alignItems:'center'
        }}>
            <Text style={{
                color:'#000',
                fontSize:20
            }}>It's profile...</Text>
        </View>
    )
}