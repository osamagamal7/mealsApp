import React from 'react'
import MealList from '../components/MealList'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import {useSelector} from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
const FavouriteScreen = (props) => {

    const selectedFav = useSelector(state => state.meals.favouriteMeals)

    if(selectedFav.length <= 0){
        return <View style={styles.content}>
            <Text>No favorite meals have been added yet, Start adding some!</Text>
        </View>
    }

    return (
        <MealList listData={selectedFav} navigation={props.navigation}  />
    )
}

FavouriteScreen.navigationOptions = ({navigation}) =>{
    return{
        headerTitle: 'Your Favorites',
        headerLeft: () =>{
            return <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="menu" iconName='ios-menu' size={25} onPress={() =>{navigation.toggleDrawer()}} />
            </HeaderButtons>
        }
    }
}

const styles = StyleSheet.create({
    content:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
    
})

export default FavouriteScreen