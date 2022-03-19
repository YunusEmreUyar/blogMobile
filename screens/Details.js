import { Text, View, TextInput, StyleSheet, FlatList, Image, useWindowDimensions,ScrollView, Button, Alert } from "react-native";
import colors from "../assets/colors/color";
import Feather from 'react-native-vector-icons/Feather';
import RenderHtml, {defaultSystemFonts} from 'react-native-render-html';
import GoBackButton from '../components/GoBackButton';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const proxy = 'https://pencereblog.pythonanywhere.com';
Feather.loadFont();
const systemFonts = ["Montserrat-Regular", ...defaultSystemFonts];

export default Details = ({route, navigation}) => {

    const target = route.params.target;
    const {width} = useWindowDimensions();
    const dateCreated = target.date_created.substring(0, 10).split("-").join(" ");
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        fetch(proxy+`/api/comment/${target.id}`)
        .then(resp => resp.json())
        .then(json => {
            if (json.detail) {
                setComments([{
                    id:0,
                    created_by: {
                        username: "",
                        profile: {
                            profile_pic: "/static/default-profile.png"
                        }
                    },
                    content: "Bu gönderi için henüz hiçbir yorum yok. İlk sen ol."
                }]);
            } else {
                setComments(json);
            }
        })
        .catch(err => {});

    }, []);


    if (!target.content.includes(proxy)) {
        target.content = target.content.split("src=\"").join(`src=\"${proxy}`);
    }

    const handleSubmit = () => {
        AsyncStorage.getItem("token")
        .then(token => {
            fetch(proxy + `/api/comment/create/${target.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                },
                body: JSON.stringify({
                    content: comment
                })
            })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                if (json.detail) {
                    Alert.alert("Yanıt", json.detail);
                } else {
                    setComments([json, ...comments]);
                }
            })
            .catch(err => {});
        })
        .catch(err => {});
    }


    const renderCommentItem = ({item}) => {
        return (
            <View style={styles.commentWrapper}>
                <View>
                    <Image
                        style={styles.commentCreatorProfile}
                        source={{uri: proxy+item.created_by.profile.profile_pic}}
                    />
                    <Text style={styles.commentCreatorUsername}>{item.created_by.username}</Text>
                </View>
                <View style={styles.commentBody}>
                    <Text style={styles.commentContent}>{item.content}</Text>
                </View>
            </View>
        );
    }

    
    return (
        <View style={styles.container}>
            <ScrollView
                keyboardShouldPersistTaps='handled'
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
                    <Text style={{marginRight:5}}>{target.estimated_reading_time} dakikalık okuma.</Text>
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

            
            {/* Author Detail Section */}
            <View style={styles.authorDetailWrapper}>
                <View style={styles.authorHeadWrapper}>
                    <Image style={styles.authorProfilePic} source={{uri: proxy+target.author.profile.profile_pic}} />
                    <Text style={styles.authorUsername}>{target.author.username}</Text>
                </View>
                <Text style={styles.authorDescr}>{target.author.profile.description}</Text>
            </View>

            {/* Comment section */}
            <Text style={styles.commentHeader}>Yorumlar</Text>
            <FlatList
                keyExtractor={item => item.id}
                data={comments}
                scrollEnabled={false}
                renderItem={renderCommentItem}
            />
            <View style={{marginBottom:10, justifyContent:'center', alignItems: 'center', flexDirection: 'row'}}>
                <TextInput 
                    multiline={true}
                    placeholder="Bir yorum ekle."
                    style={styles.input}
                    onChange={(e) => setComment(e.nativeEvent.text)}
                />
                <Button 
                    style={{margin:10, borderRadius: 10}}
                    title="Gönder"
                    color={colors.price}
                    onPress={handleSubmit}
                />
            </View>


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
    },
    commentBody: {
        marginLeft: 10,
        justifyContent: 'center',
        padding: 10,
        flexShrink: 1
    },
    commentCreator: {
    },
    commentCreatorProfile: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    commentCreatorUsername: {
        fontFamily: "Montserrat-SemiBold",
        fontSize: 12
    },
    commentWrapper: {
        flexDirection: 'row',
        padding: 8
    },
    commentHeader: {
        margin: 10,
        fontFamily: "Montserrat-Bold",
        fontSize: 24
    },
    commentContent: {
        lineHeight: 20,
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        textAlign: 'justify'
    },
    input: {
        minWidth: '80%',
        maxWidth: '80%',
        backgroundColor: colors.textLight,
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 10,
        borderRadius: 15,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        fontFamily: 'Montserrat-Regular',
        fontSize: 14
    }
});
