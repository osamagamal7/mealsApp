import {MEALS} from '../../data/dummy-data';
import {TOGGLE_FAVORITE, SET_FILTERS} from '../actions/actions'
const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favouriteMeals: []
}

const mealsReducer = (state = initialState, action) =>{ 
    switch(action.type){
        case TOGGLE_FAVORITE:
        const existingIndx = state.favouriteMeals.findIndex(meal => meal.id === action.mealId)    
        if(existingIndx >= 0 ){
            const updatedFav = [...state.favouriteMeals]
            updatedFav.splice(existingIndx, 1)
            return{
                ...state,
                favouriteMeals: updatedFav
            }
        }else{
            const meal = state.meals.find(meal => meal.id === action.mealId)
            return{...state, favouriteMeals: state.favouriteMeals.concat(meal)}
        }

        case SET_FILTERS:
            const userFilters = action.filters;
            const updatedFilters = state.meals.filter(meal =>{
                if(userFilters.gluteenFree && !meal.isGlutenFree ){
                    return false;
                }
                if(userFilters.vegan && !meal.isVegan  ){
                    return false
                }
                if(userFilters.isVegetarian && !meal.isVegetarian ){
                    return false
                }
                if(userFilters.lactoseFree && !meal.isLactoseFree){
                    return false
                }
                return true
            })

            return {...state, filteredMeals: updatedFilters}

        default: return state
    }
}

export default mealsReducer;