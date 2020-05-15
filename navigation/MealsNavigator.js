import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import Colors from '../constants/Colors'
import { createDrawerNavigator } from 'react-navigation-drawer'
import CatagoriesScreen from '../screens/CatagoriesScreen'
import CatagoriesMealsScreen from '../screens/CatagoriesMealsScreen'
import MealDetailScreen from '../screens/MealDetailScreen'
import FavouriteScreen from '../screens/FavouriteScreen'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import FiltersScreen from '../screens/FiltersScreen'



const MealNavigator = createStackNavigator({
    Catagories: {
       screen: CatagoriesScreen,
    },
    CatagoryMeals: {
        screen: CatagoriesMealsScreen,
       
    },
    MealDetail: MealDetailScreen
} ,{
    
    defaultNavigationOptions:{
        headerStyle: {
            backgroundColor: Platform.OS === 'android'? Colors.primaryColor : '',
        },
        headerTitleStyle:{
            fontFamily: 'open-sans-bold'
        } ,
        headerBackTitleStyle:{
            fontFamily: 'open-sans'
        },
        headerTintColor: Platform.OS === 'android'? 'white' : Colors.primaryColor
    }
})

// a navigator stack for Favourite meals that point to favourite meals and its details
const FavNavigator = createStackNavigator({

        Favourites: FavouriteScreen,
        
        MealDetails: MealDetailScreen
    
}, {
    
    defaultNavigationOptions:{
        headerStyle: {
            backgroundColor: Platform.OS === 'android'? Colors.primaryColor : '',
        },
        headerTintColor: Platform.OS === 'android'? 'white' : Colors.primaryColor
    }
})

//creating a stack for filter just to give it a header
const filtersNavigator = createStackNavigator({
    filters:{
        screen: FiltersScreen
    }
},{
    
    defaultNavigationOptions:{
        headerStyle: {
            backgroundColor: Platform.OS === 'android'? Colors.primaryColor : '',

        },
        headerTintColor: Platform.OS === 'android'? 'white' : Colors.primaryColor
    }
})



//  screens obj const for createMaterialBottomTabNavigator and createBottomTabNavigator
const tabScreenConfig = {

    Meal:{
        screen: MealNavigator,
        navigationOptions:{
            tabBarIcon: (tabInfo) =>{
                return <Ionicons name="ios-restaurant" size={24} color={tabInfo.tintColor} /> 
            },
            tabBarColor: Colors.primaryColor, //the bg color of createMaterialBottomTabNavigator (android) 
            tabBarLabel: Platform.OS === 'android'?  <Text style={{fontFamily: "open-sans-bold"}}>Meals</Text> : 'Meals'  // only for android cuz jsx with style in ios, it disables the other styles and colors of tabBottomNavigator
        }
    } ,
    
    Favorites: {
        screen: FavNavigator, 
        navigationOptions:{
            tabBarIcon: (tabInfo) =>(
                <Ionicons name="ios-star" size={25} color={tabInfo.tintColor}/>
            )
            ,tabBarColor: Colors.accentColor,  //the bg color of createMaterialBottomTabNavigator (android)
        tabBarLabel: Platform.OS === 'android'?  <Text style={{fontFamily: "open-sans-bold"}}>Favorites</Text> : 'Favorites'  

        }
    }
    
}


const favMealScreen = Platform.OS === 'android'?  createMaterialBottomTabNavigator(
    tabScreenConfig , {
        activeColor : "white", // the icon color fo android
        shifting : true,
    }
) : createBottomTabNavigator( tabScreenConfig , {
    tabBarOptions:{  
        labelStyle:{
            fontFamily: 'open-sans',
        },
        activeTintColor: Colors.accentColor, //icon color to IOS  
    }
})

const MainNavigator = createDrawerNavigator({
    MealsFav: {
        screen: favMealScreen,
        navigationOptions:{
            drawerLabel: 'Meals'
        }
    } ,
    filters: {
        screen: filtersNavigator,
        
    } 
}, { contentOptions:{
    activeTintColor: Colors.accentColor,
    labelStyle:{
        fontFamily: 'open-sans-bold',

    }
} })

export default createAppContainer(MainNavigator)