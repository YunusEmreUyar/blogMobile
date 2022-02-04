import { Text, View, StyleSheet, Image, TouchableOpacity, useWindowDimensions,ScrollView, Button } from "react-native";
import colors from "../assets/colors/color";
import Feather from 'react-native-vector-icons/Feather';
import RenderHtml, {defaultSystemFonts} from 'react-native-render-html';
import GoBackButton from '../components/GoBackButton';
import {like} from '../utils/AuthUtils';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const proxy = 'https://artandmovieisnotgonnabethename.herokuapp.com';
Feather.loadFont();
const systemFonts = ["Montserrat-Regular", ...defaultSystemFonts];

export default Details = ({route, navigation}) => {

    const target = route.params.target;
    const {width} = useWindowDimensions();
    const dateCreated = target.date_created.substring(0, 10).split("-").join(" ");
    const [isAlreadyLiked, setIsAlreadyLiked] = useState(false);


    useEffect(() => {
        AsyncStorage.getItem("userId")
        .then(id => {
            if (target.likes.includes(id) === true) {
                setIsAlreadyLiked(true); 
            }
        })
        .catch(err => {});
    });


    if (!target.content.includes(proxy)) {
        target.content = target.content.split("src=\"").join(`src=\"${proxy}`);
    }
    

    return (
        <View style={styles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                showsVerticalScrollIndicator={false}
            >
            {/* Go Back Button */}
            <GoBackButton navigation={navigation} />
             
            {/* Title */}
            <View style={styles.titlesWrapper}>
                <Text style={styles.titlesSubTitle}>{target.title}</Text>
                <Text style={styles.titlesTitle}>#{target.category.name}</Text>
            </View>
            
            {/* Main Section */}
            <View style={styles.cardHeadWrapper}>
                <Image style={styles.cardImage} source={{uri: proxy+target.cover}} />
            </View>
            <View style={styles.cardDescWrapper}>
                <View style={styles.cardDescInner}>
                    <Text style={{marginRight:5}}>{dateCreated}</Text>
                    <Feather
                        color={colors.price} 
                        name="calendar"
                        size={12}
                    />
                </View>
                <View style={styles.cardDescInner}>
                    <Text style={{marginRight:5}}>{target.estimated_reading_time} mins to read.</Text>
                    <Feather
                        color={colors.price}
                        name="book-open"
                        size={12}
                    />
                </View>
                
            </View>
            <View style={styles.cardBodyWrapper}>
                <RenderHtml 
                    contentWidth={width}
                    source={{html:target.content}}
                    systemFonts={systemFonts}
                    tagsStyles={{p:styles.renderHtmlText}}
                />
            </View>

            {/* Like section */}
            <View style={styles.likeSectionWrapper}>
                <Text style={styles.likeCounter}>{target.likes.length} times liked.</Text>
                {isAlreadyLiked
                ?   <Text>You already liked.</Text>
                :   <Button 
                        title="Like"
                        color={colors.price}
                        onPress={() => like()}
                        accessibilityLabel="Learn more about"
                    />
                }
                
            </View>

            {/* Author Detail Section */}
            <View style={styles.authorDetailWrapper}>
                <View style={styles.authorHeadWrapper}>
                    <Image style={styles.authorProfilePic} source={{uri: proxy+target.author.profile.profile_pic}} />
                    <Text style={styles.authorUsername}>{target.author.username}</Text>
                </View>
                <Text style={styles.authorDescr}>{target.author.profile.description}</Text>
            </View>

            {/* Comment section */}

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    titlesWrapper: {
        marginTop: 30,
        paddingHorizontal: 20,
        alignItems: 'flex-end'
    },
    titlesSubTitle: {
        fontFamily: "Montserrat-Bold",
        fontSize: 32,
        color: colors.textDark
    },
    titlesTitle: {
        fontFamily: "Montserrat-Regular",
        fontSize: 16,
        color: colors.textDark
    },
    cardHeadWrapper: {
        marginVertical: 16,
    },
    cardImage: {
        margin: 10,
        width: '100%',
        alignSelf: 'center',
        //borderRadius: 10,
        resizeMode: 'contain',
        height: 240
    },
    renderHtmlText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
        color: colors.black,
        textAlign: 'justify',
        lineHeight: 25
    },
    cardBodyWrapper: {
        margin: 10,
        padding: 10,
    },
    cardDescWrapper: {
        marginHorizontal: 20,
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    authorDetailWrapper: {
        padding: 8,
        margin: 10,
        borderColor: colors.textLight,
        borderWidth: 1,
        borderRadius: 10
    },
    authorDescr: {
        textAlign: 'justify',
        fontFamily: 'Montserrat-Regular',
        marginTop: 5,
        lineHeight: 20,
        fontSize: 14
    },
    authorProfilePic: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        borderRadius: 80
    },
    authorUsername: {
        fontWeight: '500',
        marginLeft: 20,
        fontFamily: 'Montserrat-Medium',
        fontSize: 24
    },
    authorHeadWrapper: {
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomColor: colors.textLight,
        borderBottomWidth: 1,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10
    },
    likeSectionWrapper: {
        flexDirection: 'row',
        marginHorizontal: 10,
        padding: 10,
        alignItems: 'center'
    },
    likeCounter: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        marginRight: 10
    },
    cardDescInner: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
