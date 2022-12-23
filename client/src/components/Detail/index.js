import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getRecipesDetail } from '../actions/index';
import  {getRecipesAll}  from '../actions/index.js';

function Detail(){
    const dispatch = useDispatch();
    const recipe = useSelector(state=>state.recipedetail.ingredients)
    let {id} = useParams();
    useEffect(() => {  //cargar el pais al iniciar la pagina
        dispatch(getRecipesDetail(id)) 
    }, [dispatch, id])
    console.log(recipe)
    return (
        <><Link to={`/`}>      <h1>atras</h1> </Link>
        <div class="lista" >
            {recipe && recipe.map(rec => (
                <div  >
                    


                    <p >{rec.name}</p>
                    <p >{rec.amount.metric.value}</p>
                    <p>{rec.amount.metric.unit}</p>
                </div>
            ))}
        </div></>
    )
}

export default Detail;
