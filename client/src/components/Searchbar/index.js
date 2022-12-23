import React,  { useEffect, useState }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {searchbyingredients} from '../actions/index';
import { Link } from 'react-router-dom';
import './index.css';
import { getRecipesAll } from '../actions';



export default function Searchbar(){
    const [search, setSearch] = useState("");
    const ingredients = useSelector(state=>state.ingredientsrecipe);
    
    const dispatch = useDispatch()
    
    useEffect(() => { 
        dispatch((getRecipesAll))
    }, [dispatch]) 

    function handleChange(e){
        setSearch(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(searchbyingredients(search))
        setSearch("")
    }
   
    return (
        <><div className='searchbox'>
            <form onSubmit={handleSubmit}>
                <p>Enter Ingredients...</p>
                <label htmlFor="search">Search</label>
                <input id="search" type="search" pattern=".*\S.*" required value={search} onChange={handleChange}  />
                <span className="caret"></span>
            </form>

            {/* <><div className='searchbox'>
        <form onSubmit={handleSubmit}>
            <div className=''>
              
                <div className=''>
                    <div className='buscador'>
                        <input type="text" className='' value={search} onChange={handleChange} placeholder="ingredients separated by ," />
                        <button className=''>Go</button>
                    </div>
                    <button className=''>Clear</button>
                </div>
            </div>
        </form>
    
    </div> */}
        </div>
        <div className='littlenav'>

        </div>
      
        <div className='resultado'>

                {ingredients && ingredients.map(el => (
                    <div>
                        <Link to={`/detail/${el.id}`}>
                            <img src={el.image} alt={el.title} />
                        </Link>
                            {/* <p>{el.missedIngedients.map(ing=>ing.original)}</p> */}
                            <p>{el.title}</p>
                    </div>
                )
                )}
            </div></>
    )
}