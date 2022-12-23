import { GET_RECIPES, GET_STATE_ID, GET_RECIPE_DETAIL, GET_RECIPE_BY_INGREDIENTS } from '../components/actions/TypesActions';

const inicialState ={

    recipes: [],
    recipesAll: [],
    recipedetail:{},
    ingredientsrecipe:[]
}

export const rootReducer = (state = inicialState, action) => {
    
    switch (action.type) {
         
        case GET_RECIPES: 

            console.log(action.payload)
            return {
                ...state,
                recipes: action.payload,
                recipesAll: action.payload
            }
            case GET_RECIPE_DETAIL:
                return {
                    ...state,
                    recipedetail: action.payload
                }
                case GET_RECIPE_BY_INGREDIENTS:
                     console.log(action.payload) 
                    return {
                        ...state,
                        ingredientsrecipe: action.payload

                    }
            case GET_STATE_ID:
                const filtId = state.recipesAll
                const Idfind = filtId.find((recipe) => {
                    if(typeof action.payload === 'number'){
                        if (recipe.idApi === action.payload) return recipe
                    } else {
                        if (recipe.id === action.payload) return recipe
                    }
                })
                return{
                    ...state,
                    detail: Idfind
                }

            // case GET_RECIPES_NAME:
            //     const addRecipe = state.recipesAll
            //       return {
            //                 ...state,
            //                 recipes: action.payload,
            //                 recipesAll: addRecipe
            //             } 
                        default: return state
        }
    
    }
