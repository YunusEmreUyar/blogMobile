import React from "react";
import { Text, View, StyleSheet, ScrollView, SafeAreaView, FlatList, Image, Dimensions } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import colors from '../assets/colors/color';
import GoBackButton from '../components/GoBackButton';
import Card from '../components/Card';
import SkeletonContent from "react-native-skeleton-content";

Feather.loadFont();
const proxy = "https://pencereblog.pythonanywhere.com";
const WIDTH = Dimensions.get("window").width;

class UserPost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [{
                author: {
                    username: 'fetching',
                    profile: {
                        profile_pic: '',
                        description: ''
                    }
                }
            },],
            isLoading: true,
        };
    }

    renderPostItem = ({item}) => {
        return (<Card item={item} navigation={this.props.navigation} />);
    }

    componentDidMount = () => {
        fetch(proxy+`/api/post/by/author/${this.props.route.params.target}`)
        .then(resp => resp.json())
        .then(json => this.setState({posts: json, isLoading: false}))
        .catch(err => {});
    }

    componentWillUnmount = () => {
        this.setState({
            posts: {
                author: {
                    username: 'fetching',
                    profile: {
                        profile_pic: '',
                        description: ''
                    }
                }
            },
            isLoading: true,
        });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                
                {/* Go Back Button */}
                <GoBackButton navigation={this.props.navigation} />

                {/* Title */}
                <SkeletonContent
                    isLoading={this.state.isLoading}
                    containerStyle={styles.authorPlaceholder}
                    layout={[
                        { key: 'photo', height: 100, width:100, borderRadius: 50, marginTop: 20},
                        { key: 'username', width: (WIDTH/3), height: 30, margin: 10},
                        { key: 'descr', width: (WIDTH-40), height: 80, margin: 10, marginBottom: 30},
                        { key: 'ruler', width: (WIDTH-40), height: 1}
                    ]}
                >
                    <View style={styles.authorBannerWrapper}>
                        <Image style={styles.authorImage}  source={{uri: proxy+this.state.posts[0].author.profile.profile_pic}}/>
                        <Text style={styles.authorName}>{this.state.posts[0].author.username}</Text>
                        <Text style={styles.authorDesc}>{this.state.posts[0].author.profile.description}</Text>
                    </View>
                    <View style={styles.horizontalRuler}></View>
                </SkeletonContent>

                {/* Main Section */}
                <SkeletonContent
                    isLoading={this.state.isLoading}
                    containerStyle={styles.authorPlaceholder}
                    layout={[
                        { key: 'photo', height: 200, width:(WIDTH-40), borderRadius: 10, marginTop: 20},
                        { key: 'username', width: (WIDTH-40), height: 20, margin: 10},
                        { key: 'descr', width: (WIDTH-40), height: 80, margin: 10}
                    ]}
                >
                    <SafeAreaView style={{flex:1}}>
                        <FlatList
                            data={this.state.posts}
                            keyExtractor={(item) => item.id}
                            renderItem={this.renderPostItem}
                            scrollEnabled={false}
                        />
                    </SafeAreaView>
                </SkeletonContent>
            </ScrollView>
        );
    }
}
export default UserPost;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    authorBannerWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    },
    authorImage: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
        borderRadius: 50
    },
    authorName: {
        color: colors.black,
        fontFamily: "Montserrat-SemiBold",
        fontWeight: "500",
        fontSize: 32
    },
    authorDesc: {
        marginVertical: 20,
        marginHorizontal: 10,
        textAlign: 'justify',
        fontFamily: 'Montserrat-Medium',
        fontSize: 12,
        lineHeight: 20
    },
    horizontalRuler: {
        borderBottomColor: colors.textLight,
        borderBottomWidth: 1,
        marginHorizontal: 10,
        marginBottom: 20
    },
    placeHolderText: {
        marginVertical: 20,
        marginHorizontal: 10,
        fontFamily: 'Montserrat-Bold',
        fontSize: 14
    },
    authorPlaceholder: {
        flex: 1,
        alignItems: 'center',

    }
});