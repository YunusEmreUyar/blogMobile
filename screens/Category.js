import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Image, SafeAreaView, FlatList, Dimensions } from "react-native";
import SkeletonContent from "react-native-skeleton-content";
import Feather from 'react-native-vector-icons/Feather';
import colors from '../assets/colors/color';
import GoBackButton from '../components/GoBackButton';
import Card from '../components/Card';

Feather.loadFont();
const proxy = "https://artandmovieisnotgonnabethename.herokuapp.com";
const WIDTH = Dimensions.get("window").width;

export default Category = ({route, navigation}) => {

    const target = route.params.target;
    const [category, setCategory] = useState([]);
    const [posts, setPosts] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const renderPostItem = ({item}) => {
        return (<Card item={item} navigation={navigation}/>);
    }

    useEffect(() => {
        fetch(`${proxy}/api/category/${target}`)
        .then(resp => resp.json())
        .then(json => setCategory(json))
        .catch(err => {});
    
        fetch(`${proxy}/api/post/by/category/${target}`)
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.detail) {
                setIsEmpty(true);
                setIsLoading(false);
            } else {
                setPosts(responseJson);
                setIsLoading(false);
            }
        })
        .catch(err => {});  
        
        return (() => {
            setCategory([]);
            setPosts([]);
            setIsLoading(true);
        });
    
    }, []);

    
    return (
        <View style={styles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                showsVerticalScrollIndicator={false}>
                
            {/* Go Back Button */}
            <GoBackButton navigation={navigation} />

            {/* Category banner */}
            <SkeletonContent
                isLoading={isLoading}
                containerStyle={styles.categoryPlaceholder}
                layout={[
                    { key: 'photo', height: 100, width:100, borderRadius: 50, marginTop: 20},
                    { key: 'username', width: (WIDTH/3), height: 30, margin: 10},
                        
                ]}
            >
                <View style={styles.categoryBannerWrapper}>
                    <Image style={styles.categoryImage} source={{uri: proxy+category.image}} />
                    <Text style={styles.categoryName}>#{category.name}</Text>
                </View>
            </SkeletonContent>

            

            {/* Posts */}
            <SkeletonContent
                isLoading={isLoading}
                containerStyle={styles.categoryPlaceholder}
                layout={[
                    { key: 'photo', height: 200, width:(WIDTH-40), borderRadius: 10, marginTop: 50},
                    { key: 'title', width: (WIDTH-40), height: 20, margin: 10},
                    { key: 'descr', width: (WIDTH-40), height: 80},
                ]}
            >
                {isEmpty
                ? <Text style={styles.notFoundText}>There is no post in this category yet.</Text>
                :   <View style={styles.postsWrapper}>
                        <SafeAreaView style={{flex:1}}>
                            <FlatList
                                keyExtractor={(item) => item.id}
                                data={posts}
                                renderItem={renderPostItem}
                                scrollEnabled={false}
                            />
                        </SafeAreaView>
                    </View> 
                }
            </SkeletonContent>            

            </ScrollView>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    categoryBannerWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    },
    categoryImage: {
        width: '100%',
        height: 100,
        resizeMode: 'contain'
    },
    categoryName: {
        color: colors.black,
        fontFamily: "Montserrat-SemiBold",
        fontWeight: "500",
        fontSize: 32
    },
    notFoundText: {
        padding: 20,
        fontFamily: "Montserrat-Bold",
        fontWeight: "500"
    },
    postsWrapper: {
        marginTop: 20
    },
});
