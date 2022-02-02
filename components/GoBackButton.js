import Feather from 'react-native-vector-icons/Feather';
import colors from '../assets/colors/color';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const GoBackButton = ({navigation}) => {


    return (
        <View>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
                <Feather 
                    name="chevron-left"
                    size={16}
                />
                <Text>go back</Text>
            </TouchableOpacity>
        </View>
        
    );

}

export default GoBackButton;

const styles = StyleSheet.create({
    goBackButton: {
        marginTop: 50,
        padding: 10,
        flexDirection: 'row',
        color: colors.primary,
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
});
