import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, Switch } from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import  Colors  from '../constants/Colors'
import { useDispatch } from 'react-redux'
import { setFilters } from '../store/actions/actions'

const FilterSwitch = (props) =>{
    return (
            <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
                <Switch trackColor={{true: Colors.primaryColor}} value={props.state}  onValueChange={props.onChane} />
            </View>
        
    )
}

const FiltersScreen = (props) => {
    const {navigation} = props
    const [isGlutenFree, setIsGlutenFree] = useState(false)
    const [isLactose, setIsLactose] = useState(false)
    const [isVegan, setIsVegan] = useState(false)
    const [isVegetarian, setIsVegetarian] = useState(false)

    const dispatch = useDispatch()

    const saveFilters = useCallback(() =>{
        const appliedFilters = {
            gluteenFree: isGlutenFree,
            lactoseFree: isLactose,
            vegan: isVegan,
            isVegetarian: isVegetarian
        }   
        dispatch(setFilters(appliedFilters))
    }, [isGlutenFree, isLactose, isVegan, isVegetarian])

    useEffect(() =>{
       navigation.setParams({'save': saveFilters})
    }, [saveFilters])  

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>

            <FilterSwitch 
            label="Gluten Free"
            state={isGlutenFree}
            onChane={newValue => setIsGlutenFree(newValue)}
            />
            <FilterSwitch 
            label="Lactose Free"
            state={isLactose}
            onChane={newValue => setIsLactose(newValue)}
            />
            <FilterSwitch 
            label="Vegan"
            state={isVegan}
            onChane={newValue => setIsVegan(newValue)}
            />
            <FilterSwitch 
            label="Vegetarian"
            state={isVegetarian}
            onChane={newValue => setIsVegetarian(newValue)}
            />
        </View>
    )
}


FiltersScreen.navigationOptions = ({navigation}) =>{
    return{

        headerTitle: 'Filter Meals',
           headerLeft: () =>{
               return <HeaderButtons HeaderButtonComponent={HeaderButton}>
                   <Item title="menu" iconName='ios-menu' size={25} onPress={() =>{navigation.toggleDrawer()}} />
               </HeaderButtons>
           },
           headerRight: () =>{
            return <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="menu" iconName='ios-save' size={25} onPress={() =>{navigation.getParam('save')()}} /> 
            </HeaderButtons>
        }
    }

    
}

export default FiltersScreen

const styles = StyleSheet.create({
    screen:{
         flex: 1,
         alignItems: 'center'
    },
    title:{
        fontSize: 22,
        fontFamily: 'open-sans-bold',
        margin: 20
    },
    filterContainer:{
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 15
    }
})
