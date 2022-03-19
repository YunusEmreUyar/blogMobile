import React from "react";
import { 
    Text, View, StyleSheet, TouchableOpacity,
    Image, FlatList, ScrollView, SafeAreaView, Dimensions, Button
} from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import colors from '../assets/colors/color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from '../components/Card';
import SkeletonContent from 'react-native-skeleton-content';

const proxy = "https://pencereblog.pythonanywhere.com";

Feather.loadFont();
MaterialCommunityIcons.loadFont();
const WIDTH = Dimensions.get("window").width;

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            categories: [],
            isPostLoading: true,
            isCategoryLoading: true,
        }
    }

    componentDidMount = () => {
        fetch(`${proxy}/api/category`)
        .then(response => response.json())
        .then(result => this.setState({categories: result, isCategoryLoading: false}))
        .catch(err => {});
        
        fetch(`${proxy}/api/post`)
        .then(resp => resp.json())
        .then(resp => this.setState({posts: resp, isPostLoading: false}))
        .catch(err => {});
    }

    renderPostItem = ({item}) => {
        return (<Card item={item} navigation={this.props.navigation}/>);
    }

    renderCategoryItem = ({item}) => {
        return (

            <TouchableOpacity onPress={() => this.props.navigation.navigate("Category",{target: item.id})} style={
                styles.categoryWrapper}>
                <Image style={styles.categoryItemImage} source={{uri:  proxy+item.image}} />
                <Text style={styles.categoryItemTitle}>{item.name}</Text>
                <View style={styles.categorySelectWrapper}>
                    <Feather
                        name="chevron-right"
                        size={8}
                        style={styles.categorySelectIcon}
                        color={colors.white} />
                </View>
            </TouchableOpacity>
        );
    }


    render() {
        return (
            
            <View style={styles.container}>
                <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                showsVerticalScrollIndicator={false}>

                    {/* Title */}
                    <View style={styles.titlesWrapper}>
                        <Text style={styles.titlesSubTitle}>Pencere blog</Text>
                        <Text style={styles.titlesTitle}>Bilim, mühendislik ve insanlık hakkında kendime notlar</Text>
                    </View>

                    {/* Categories */}                        
                        <SkeletonContent
                            containerStyle={styles.categoryPlaceholderContainer}
                            isLoading={this.state.isCategoryLoading}
                            layout={[
                            { key: 'categoryPhoto', height: 100, width:100, borderRadius: 50, marginVertical: 20},
                            { key: 'categoryTitle', width: (WIDTH/3), height: 20, margin: 10, marginBottom: 30}
                            ]}
                        >
                            <View style={styles.categoriesWrapper}>
                                <Text style={styles.categoriesTitle}>Kategoriler</Text>
                                <View style={styles.categoriesListWrapper}>
                                    <SafeAreaView style={{flex:1}}>
                                        
                                        <FlatList
                                            data={this.state.categories}
                                            renderItem={this.renderCategoryItem}
                                            keyExtractor={(item) => item.id}
                                            horizontal={true}
                                        />
                                    </SafeAreaView>
                                </View>
                            </View>
                        </SkeletonContent>

                    {/* Posts */}   
                    <SkeletonContent
                        containerStyle={styles.postsPlaceholderWrapper}
                        isLoading={this.state.isPostLoading}
                        layout={[
                            { key: 'postPhoto', height: 200, width:(WIDTH-20), borderRadius: 10, padding: 10, marginTop: 30},
                            { key: 'postTitle', width: (WIDTH-20), height: 20, margin: 10},
                            { key: 'postSubtitle', width: (WIDTH-20), height: 60, margin: 10, marginBottom: 0},
                        ]}
                        >
                            <View style={styles.postsWrapper}>
                                <SafeAreaView style={{flex:1}}>
                                    <FlatList 
                                        keyExtractor={(item) => item.id}
                                        data={this.state.posts}
                                        renderItem={this.renderPostItem}
                                        scrollEnabled={false}
                                        initialNumToRender={3}
                                    />
                                </SafeAreaView>
                            </View>

                            
                    </SkeletonContent>
                </ScrollView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titlesWrapper: {
        marginTop: 50,
        paddingHorizontal: 20,
    },    
    titlesTitle: {
        fontFamily: "Montserrat-Regular",
        fontSize: 16,
        color: colors.textDark,
    },
    titlesSubTitle: {
        fontFamily: "Montserrat-Bold",
        fontSize: 32,
        color: colors.textDark,
    },
    categoryWrapper : {
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        margin: 8,
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
    categoryItemTitle : {
        textAlign: 'center',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        marginTop: 10,
    },
    categorySelectWrapper : {
        alignSelf: 'center',
        backgroundColor: colors.price,
        justifyContent: 'center',
        marginTop: 20,
        width: 26,
        height: 26,
        borderRadius: 26,
        marginBottom: 20,
    },
    categorySelectIcon : {
        alignSelf: 'center',
    },
    categoriesWrapper : {
        marginTop: 30,
        //alignItems: 'flex-start'
    },
    categoriesTitle : {
        fontSize: 16,
        fontFamily: "Montserrat-Bold",
        paddingHorizontal: 20,
    },
    categoriesListWrapper : {
        alignItems: "center",
        paddingTop: 15,
        paddingBottom: 20,
    },
    categoryItemImage: {
        width: 60,
        height: 60,
        marginTop: 25,
        alignSelf: 'center',
        marginHorizontal: 20,
    },
    categoryPlaceholderContainer: { 
        flex: 1,
        width: WIDTH, 
        margin: 10,
        padding: 10,
        borderRadius: 10,
    },
    postsPlaceholderWrapper: {
        flex: 1,
        width: WIDTH,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});


export default Home;