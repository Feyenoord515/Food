const express = require('express')
const router = express.Router()
const axios = require('axios');
require('dotenv').config();
const { Recipe, Diet, Op } = require('../db');
const {API_KEY, spoonacularURL} = process.env;

//!                   1

const getApiInfo = async () => {
    try
    {
        const resAxios = await axios.get(`${spoonacularURL}/recipes/complexSearch?apiKey=${API_KEY}&cuisine:italian,american,french,european,cajun,british,eastern european,german,greek,irish,latin american,mediterranean,mexican,nordic,spanish,tai&addRecipeInformation=true&fillIngredients=true&number=300`);
        const { results } = resAxios.data ;
    console.log(results)
        
        if (results.length > 0) {

            let response = await results?.map((result) => {
                return {
                    name: result.title,
                    vegetarian: result.vegetarian,
                    vegan: result.vegan,
                    glutenFree: result.glutenFree,
                    dairyFree: result.dairyFree, 
                    image: result.image, 
                    idApi: result.id, 
                    score: result.spoonacularScore ? result.spoonacularScore[0] : 'Undefined Score',
                    healthScore: result.healthScore,
                    types: result.dishTypes?.map(element => element),  
                    diets: result.diets?.map(element => element), 
                    summary:result.summary, 
                    ingredients:result.extendedIngredients?.map(element=>element.original) ,
                    steps: (result.analyzedInstructions[0] && result.analyzedInstructions[0].steps?result.analyzedInstructions[0].steps.map(item=>item.step).join(" \n"):'')
                }        
            })
console.log(response)
        return response;
    } 

    }catch (error) {
        console.error(error);
        return ([])
    }
}

const getDBInfo = async () => {
    try{
        const dataDB =  await Recipe.findAll({ 
            include:{
                model: Diet,
                attributes: ['name'],
                through:{
                    attributes: []
                }
            }
        })
        let response = await dataDB?.map(recipe => {
                 return {
                     id: recipe.id,
                     name: recipe.name,
                     summary: recipe.summary  ? recipe.summary[0] : 'Undefined summary',
                     score: recipe.score,
                     healthScore: recipe.healthScore,
                     image: recipe.image,
                     ingredients:recipe.ingredients,
                     steps: recipe.steps,
                     diets: recipe.diets?.map(diet => diet.name),
                 }
             });
        return response;
    }catch (error) {
      console.error(error);
    }
}

//!                   3

const getAllInfo = async () => {
        try{
            const apiInfo = await getApiInfo();
            const bdInfo = await getDBInfo();
            const infoTotal = apiInfo.concat(bdInfo);
            return infoTotal;
        }catch (error) {
            console.error(error);
        }
     }

//!                   4


// const getDyte= async(diet)=>{

//     try{
//         const DBInfo = await getDBInfo();
//         const filtByName = DBInfo.filter(recipe => recipe.diets.includes(name));
           
//                 return filtByName;
//     }
// }



const getApiByName = async (name) => {
       
        try{
            const resAxios = await axios.get(`${spoonacularURL}/recipes/complexSearch?query=${name}&addRecipeInformation=true&number=100&apiKey=${API_KEY}`);
            const { results } = resAxios.data;
            if(results.length > 0){
                let response = results?.map((result) => {
                    return {
                        name: result.title,
                        vegetarian: result.vegetarian,
                        vegan: result.vegan,
                        glutenFree: result.glutenFree,
                        dairyFree: result.dairyFree, 
                        image: result.image, 
                        idApi: result.id, 
                        score: result.spoonacularScore,
                        healthScore: result.healthScore,
                        types: result.dishTypes?.map(element => element),  
                        diets: result.diets?.map(element => element),
                        ingredients:result.extendedIngredients?.map(element=>element.original) , 
                        summary:result.summary, 
                        steps: (result.analyzedInstructions[0] && result.analyzedInstructions[0].steps?result.analyzedInstructions[0].steps.map(item=>item.step).join(" \n"):'')
                    }
                })
          return response           
        }

        else{
            console.log("NO hay coincidencia en la API");
            //return ('error');
        }

        }catch (error) {
            console.error(error);
            return ('error')
        }
    }

//!                   5
    const getDBByName = async (name) => {
        try{
            const DBInfo = await getDBInfo();
            const filtByName = DBInfo.filter(recipe => recipe.name.includes(name));
           
            return filtByName;
        }catch (error) {
            return ('error')
        } 
    }
//!                   6     
    const getInfoByName = async (name) => {
        try{
            const apiByName = await getApiByName(name)
            const DBByName = await getDBByName(name)
            const infoTotal = apiByName.concat(DBByName)
            return infoTotal
        }catch (error) {
            return ('error')
        }
    }     

//^       
   1
router.get('/', async (req, res) => {

    const { name } = req.query

    if (name) {
  
        const infoByName = await getInfoByName(name);
        if (infoByName !== 'error'){
            console.log("Se encontro coincidencia con name")
            infoByName.length > 0 ? res.json(infoByName) : res.status(400).json([{ name: 'not found any recipes'}]);
        }else{
            console.log("Error")
            res.status(404).json([{ name: 'Error'}])
        }

    }else{
       // para no confundir a home, si no hay un name de busqueda muestra toda la info.
        const allDate = await getAllInfo() 
        if (allDate !== 'error'){  
            res.json(allDate);
        }else{
            res.status(404).json({message:'Error en la búsqueda de datos'})
        }

    }
});



//^              4

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    
    try{
        if (id.length > 12){
            const dataDB = await Recipe.findByPk(id,{
                include: {
                model: Diet,
                atributes: ["name"],
                through: {
                    attributes: [],
                    },
                },
            });
            if(dataDB){
            const obj = {
                id: dataDB.id,
                name: dataDB.name,
                summary: dataDB.summary,
                score: dataDB.score,
                healthScore: dataDB.healthScore,
                image: dataDB.image,
                ingredients: dataDB.ingredients,
                steps: dataDB.steps,
                diets: dataDB.diets?.map(diet => diet.name)
            }
                res.json(obj)
            }else{
                console.log('bd')
                const objerr = {
                    name: 'Recipe not Found',
                    summary: 'None',
                    score: 0,
                    healthScore: 0,
                    image: 'https://www.knownhost.com/blog/wp-content/uploads/2017/11/404-Error-Message.jpg',
                    steps: 'none',
                    diets: []
                }
                res.json(objerr)
            }
        }else{

            const resAxios = await axios.get(`${spoonacularURL}/recipes/${id}/information?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
            const {result} = resAxios.data;
            let obj = {};

            obj = {
                name: result.title, 
                vegetarian: result.vegetarian,
                vegan: result.vegan,
                glutenFree: result.glutenFree,
                dairyFree: result.dairyFree,
                image: result.image, 
                idApi: result.id, 
                score: result.spoonacularScore, 
                healthScore: result.healthScore, 
                diets: result.diets?.map(element => element),types: result.dishTypes?.map(element => element), 
                ingredients:result.ingredients,
                summary:result.summary, 
                steps: result.instructions
               }
            
            if (obj){
                res.json(obj);
            }else{

                let objerrors

                objerrors = {
                    name: 'Recipe not Found', 
                    image: 'https://www.knownhost.com/blog/wp-content/uploads/2017/11/404-Error-Message.jpg',  
                    score: 0, 
                    healthScore: 0, 
                    diets: [], 
                    summary:'none', 
                    steps: 'none'}

                res.json(objerrors)
            }
        }
    }catch(e){
        let objerr
    
        objerr = {name: 'only enter numbers less than 100000 or UUID code', 
        image: 'https://www.knownhost.com/blog/wp-content/uploads/2017/11/404-Error-Message.jpg',  
        score: 0, 
        healthScore: 0, 
        diets: [], 
        summary:'none', 
        steps: 'none'}

    res.json(objerr)
    }
})

module.exports = router