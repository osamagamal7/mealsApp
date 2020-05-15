import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground} from 'react-native'
import DefaultText from './DefaultText'

const MealItem = (props) => {
    return (
        <View style={styles.mealItem}>
            <TouchableOpacity onPress={props.onSelectMeal}>
                <View>
                    <View style={{...styles.mealRow, ...styles.mealHeader}}>
                    {/* if we want the text to be above above the background image we'd have to close the tag */}
                        <ImageBackground source={{uri: props.image}} style={styles.bgImage}>
                            <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
                        </ImageBackground>
                    </View>
                    <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
                        <DefaultText>{props.duration}m</DefaultText>
                        <DefaultText>{props.complexity.toUpperCase()}</DefaultText>
                        <DefaultText>{props.affordability.toUpperCase()}</DefaultText>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default MealItem

const styles = StyleSheet.create({
    mealItem:{
        height: 200,
        width: '100%',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        overflow: 'hidden', //to apply the borderRadious on the image
        marginVertical: 10
    },
    bgImage:{
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    mealRow: {
        flexDirection: 'row'
    },
    mealHeader:{
        height: '85%',
    },
    mealDetail: {
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '15%' //we don't have to specify height here as it will get 15% automatically as the other element taking 85% but if we wanna use flexbox to center we have to explicitely define that
    },
    title:{
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 12,
        paddingVertical: 5,
        textAlign: 'center'
    },
})
