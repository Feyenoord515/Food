import React, {useEffect} from 'react';
import { useNavigate, Link }  from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux';
import  {getRecipesAll}  from '../actions/index.js';
import {CardComponent} from '../cards/index';

import './index.css'



function Card() {
const dispatch = useDispatch();
const recipes = useSelector(state=> state.recipesAll)
useEffect(()=>{
dispatch(getRecipesAll())
},[])  
  console.log(recipes)

return (
        <div className="bloque">    
 <div className="card">
  {recipes && recipes.map(rec => (
  <Link to={`/detail/${rec.idApi}`} className='linkToDetails'>
              
                <div key={rec.idApi}>
                    <img className='flagImg' src={rec.image} alt={rec.name} />
                    <div className="infoCard">
                    <Link to={`/detail/${rec.idApi}`}> <h1 className="title">{rec.name}</h1></Link>
                    {/* <p className="continents">{rec.types}</p> */}
                    <p className="population">{rec.ingredients}</p>
                    <p>{rec.steps}</p>
                    </div>
                    </div>
              
        </Link>
        ))}
        </div>
        
        </div>
) 
}

export default Card;