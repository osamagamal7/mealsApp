import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import {CATEGORIES} from '../data/dummy-data'
import MealList from '../components/MealList'
import { useSelector } from 'react-redux'

const CatagoriesMealsScreen = (props) => { 
    const catId = props.navigation.getParam('categoryid') 

    const availableMeals = useSelector(state => state.meals.filteredMeals) 

    const displayedMeals = availableMeals.filter((meal) => (meal.categoryIds.indexOf(catId) >= 0)) 
   
   if(displayedMeals.length === 0 ){
       return <View style={styles.content}>
           <Text>No meals to display, maybe you need to check filters?</Text>
       </View>
   }
    return (
        <MealList listData={displayedMeals} navigation={props.navigation} /> 
    )
}

CatagoriesMealsScreen.navigationOptions = (navigationData) =>{
    const catId = navigationData.navigation.getParam('categoryid')
    const displayedMeals = CATEGORIES.find((cat) => (cat.id === catId))

    return {
        headerTitle: displayedMeals.title,
       
}
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        padding: 15
    },
    content:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default CatagoriesMealsScreen