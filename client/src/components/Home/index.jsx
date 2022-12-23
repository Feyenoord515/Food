import React, {useEffect, useState} from 'react';
import NavBarCompoment from '../Navbar/index'
import { Link } from 'react-router-dom';
import CardComponent from '../cards';
import './index.css' 
import { useDispatch, useSelector } from 'react-redux';
import PaginationComponent from '../Pagination';
import { getRecipesAll } from '../actions';

export default function Home(){
    const dispatch = useDispatch
    const AllRecipes = useSelector(state=>state.recipesAll)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPages] = useState(10); 
    useEffect(() => { 
        dispatch((getRecipesAll))
    }, [dispatch]) 
    const indexOfLastItem = currentPage * itemsPerPages; 
    const indexOfFirstItem = indexOfLastItem - itemsPerPages; 
    const currentItems = AllRecipes.slice(indexOfFirstItem, indexOfLastItem)

    return (
        <>
        
        <div>
        <div>
            <NavBarCompoment />
            </div>
        <div className='bordecito'>

            </div>
            <div className='borde'>
            
            </div>
            <div className="cards">
                <CardComponent AllRecipes={currentItems}/>
            </div>
            <div className="pagination">
                <PaginationComponent AllRecipes={AllRecipes} itemsPerPages={itemsPerPages} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
            </div>
        </div>
       
           </>
          
          
      
            
    )
}