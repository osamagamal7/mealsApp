import React from 'react'
import {  FlatList } from 'react-native'
import {CATEGORIES} from '../data/dummy-data'
import CategoryGridTile from '../components/CategoryGridTile'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'


const CatagoriesScreen = (props) => { 

    //we moved this function inside, to get access to props to navigate
    const renderGridItem = (itemData) =>{
        return(
           <CategoryGridTile color={itemData.item.color} title={itemData.item.title} onSelect={() =>{
               props.navigation.navigate('CatagoryMeals', {categoryid: itemData.item.id}); 
                
           }}/>
        )
    }
    
    return (
            <FlatList 
                data={CATEGORIES} 
                renderItem={renderGridItem}
                numColumns={2} 
                 />
    )
}

CatagoriesScreen.navigationOptions = ({navigation}) =>{
    return{
        headerTitle: 'Meal Catagories',
           headerLeft: () =>{
               return <HeaderButtons HeaderButtonComponent={HeaderButton}>
                         <Item title="menu" iconName='ios-menu' size={25} onPress={() =>{navigation.toggleDrawer()}} />
                     </HeaderButtons>
           }
    }
}

export default CatagoriesScreen