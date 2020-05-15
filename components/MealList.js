import React from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import MealItem from './MealItem'
import { useSelector } from 'react-redux'


const MealList = (props) => {


    // const favMeals = useSelector(state => state.meals.favouriteMeals)

    const renderMealItem = (itemData) =>{
        // const isFavourite = favMeals.some(meal => meal.id === itemData.item.id)
        return(
            <MealItem title={itemData.item.title} 
             duration={itemData.item.duration}
             affordability={itemData.item.affordability}
             complexity={itemData.item.complexity}
             image={itemData.item.imgUrl}
             onSelectMeal={() => {props.navigation.navigate('MealDetail', 
                {mealId: itemData.item.id, mealTitle: itemData.item.title})}}/>
        )
    }
    return (
        <View style={styles.list}>
            <FlatList data={props.listData} navigation={props.navigation} renderItem={renderMealItem} />
        </View>
    )
}

export default MealList

const styles = StyleSheet.create({
    list:{
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    }
})
