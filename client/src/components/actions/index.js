import axios from 'axios';
import { GET_RECIPES, GET_STATE_ID, GET_RECIPE_DETAIL, GET_RECIPE_BY_INGREDIENTS } from './TypesActions.js';

// const {REACT_APP_SERVER} = process.env;

// export function getRecipesAll(){
//     return function(dispatch){
//              axios.get("http://localhost:3001/recipes")
//             .then((json) => {

//             return dispatch({
//                 type: GET_RECIPES,
//                 payload: json.data
//             })
//         }).catch((error) => {
//             console.log(error)
//         })
//     }
// }
// export function getRecipesAll(){
//     return function (dispatch){
//         return fetch("http://localhost:3001/recipes")
//         .then(r=>r.json())
//         .then(res=>dispatch({type: GET_RECIPES, payload: res}))
//             .catch(error=> console.log('ERROR--->', error))
            
//     }
// }

  export function getRecipesAll(){ ////asincrona
                return async function (dispatch){
                    try {
                        const r = await fetch("http://localhost:3001/recipes");
                        const res = await r.json();
                        return dispatch({ type: GET_RECIPES, payload: res });
                    } catch (error) {
                        return console.log('ERROR--->', error);
                    }
                        
                }
            }

export const getRecipesDetail = (id) => async dispatch =>{
    try {
        const response = await axios(`https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=ff8b715df15b4894859b6f0518427e8e`);
        return dispatch({ type: GET_RECIPE_DETAIL, payload: response.data });
    } catch (error) {
        return console.log('ERROR--->', error);
    }   
}        
export function searchId(payload) {
    return {
        type: GET_STATE_ID,
    }
}

export const searchbyingredients = (ingredients) => async dispatch =>{
    try{
        const response = await axios(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=ff8b715df15b4894859b6f0518427e8e`);
        return dispatch({type: GET_RECIPE_BY_INGREDIENTS, payload: response.data});
    } catch (error) {
        return console.log('ERROR--->', error);
    }
}