import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import colors from "../assets/colors/color";

const proxy = "https://artandmovieisnotgonnabethename.herokuapp.com";


export default Card = ({item, navigation}) => {

    if (item.cover == null) {
        item.cover = '/static/default-movie.jpg';
    }

    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("Details", {target: item,})} style={styles.cardHeadWrapper}>
                <Image style={styles.cardImage} source={{uri: proxy+item.cover}} />
                <Text style={styles.cardTitle}>{item.title}</Text>
            </TouchableOpacity>
            <View style={styles.cardBodyWrapper}>
                <Text style={styles.cardDescr}>{item.description}</Text>
                <View style={styles.cardBottomWrapper}>
                    <TouchableOpacity onPress={() => navigation.navigate("UserPost", {target: item.author.id})}>
                        <Text style={styles.cardAuthor}>{item.author.username}</Text>
                    </TouchableOpacity>
                    <Text style={styles.cardReadingTime}>{item.estimated_reading_time} mins to read.</Text>
                </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: colors.white,
        flex: 1,
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    cardHeadWrapper: {
        marginVertical: 5,
    },
    cardImage: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        borderRadius: 10
    },
    cardTitle: {
        marginHorizontal: 5,
        marginVertical: 10,
        fontSize: 20,
        fontFamily: 'Montserrat-SemiBold',
        color: colors.black
    },
    cardBodyWrapper: {
        fontFamily: 'Montserrat-Regular',
        color: colors.textDark
    },
    cardDescr: {
        textAlign: 'justify',
        margin: 5,
        lineHeight: 20,
        fontFamily: 'Montserrat-Regular'
    },
    cardReadingTime: {
        margin: 5,
        color: colors.primary,
        alignSelf: 'flex-end'
    },
    cardBottomWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10
    },
    cardAuthor: {
        color: colors.price,
    }
});