import React from "react";
import { Link } from "react-router-dom"; 
import './index.css'

function CardComponent({idApi, name, image, types, ingredients}) {
    return(
        <Link to={`/detail/${idApi}`} className='linkToDetails'> 
            <div className="card">
                <div key={idApi}>
                    <img src={image} alt='img not found' className='flagImg' />
                    <div className="infoCard">
                        <h1 className="title">{name}</h1>
                        <p className="continents">Types dish: {types}</p>
                        <p className="population">Ingredients: {ingredients}</p>
                        
                    </div>
                </div>

            </div>
        </Link>
    )
}

export default CardComponent;