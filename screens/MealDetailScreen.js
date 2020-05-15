import React, { useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import DefaultText from '../components/DefaultText'
import { useSelector, useDispatch } from 'react-redux'
import { toggleFavorite } from '../store/actions/actions'

const ListItem = (props) =>{
  return  <View style={styles.listItem}>
        <Text>{props.children}</Text>
    </View>
}

const MealDetailScreen = (props) => {
    
    const mealId = props.navigation.getParam('mealId')
    //we're getting all the MEALS as a base to search for an id
    const availableMeals = useSelector(state => state.meals.meals)
    const selectedMeal = availableMeals.find((meal) => (meal.id === mealId))

    const currentMealIsFav = useSelector(state => state.meals.favouriteMeals.some( meal => meal.id === mealId))

    const dispatch = useDispatch()

    const toggleFavHandler = useCallback(() =>{
        dispatch(toggleFavorite(mealId))
    }, [dispatch, mealId])

     useEffect(() =>{
        props.navigation.setParams({mealFav: toggleFavHandler})
    }, [toggleFavHandler])

    useEffect(() =>{
        props.navigation.setParams({isFav: currentMealIsFav})
    }, [currentMealIsFav])


    return (
        <ScrollView>
            <Image source={{uri: selectedMeal.imgUrl}} style={styles.img}/>
            <View style={styles.detail}>
                <DefaultText>{selectedMeal.duration}m</DefaultText>
                <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map(ingredient => (
                <ListItem key={ingredient}>{ingredient}</ListItem>
            ))}
            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map(step => (
                <ListItem key={step}>{step}</ListItem>
            ))}
        </ScrollView>
    )
}

MealDetailScreen.navigationOptions = ({navigation}) =>{
    const mealTitle = navigation.getParam('mealTitle')
    const toggleFavourite = navigation.getParam('mealFav')
    const isFav = navigation.getParam('isFav')
    return {
        headerTitle: mealTitle,
        headerTitleStyle:{
            fontSize: 15,
        },
        headerRight: () =>  {
           return <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Fav" iconName={isFav? "ios-star": "ios-star-outline"} onPress={toggleFavourite}
             />
             
        </HeaderButtons>
           
        }


    } 
}

const styles = StyleSheet.create({
    detail:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15
    },
    img:{
        width: '100%',
        height: 200
    },
    title:{
        fontSize: 22,
        fontFamily: 'open-sans-bold',
        textAlign: 'center'
    },
    listItem:{
        marginVertical: 10,
        marginHorizontal: 20,
        borderWidth: 1,
        padding: 10,
        borderColor: '#ccc'
    }
})

export default MealDetailScreen