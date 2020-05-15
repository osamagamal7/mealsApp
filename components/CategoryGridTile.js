import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const CategoryGridTile = (props) => {
    return (
             <TouchableOpacity style={styles.gridItem}
                onPress={props.onSelect}>
                <View style={{...styles.container, ...{backgroundColor: props.color} }}>
                    <Text style={styles.title} numberOfLines={2}>{props.title}</Text>
                </View>
            </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({ 
    gridItem:{
        flex: 1,
        margin: 15,
        height: 150, 
    },
    container:{
        flex: 1, 
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 4,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 15,
    },
    title:{
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'right' 
    }
})


export default CategoryGridTile

