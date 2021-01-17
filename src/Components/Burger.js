import React from 'react'
import BurgerIngredients from "./BurgerIngredients"
import './Burger.css'

const Burger = (props) => {
    let transformedingredients = Object.keys(props.ingredient)
        .map(mo => {
            return [...Array(props.ingredient[mo])].map((_, i) => {
                return <BurgerIngredients key={mo + i} type={mo} />
               
            })
           
        })
    
    .reduce((acc, currentValue) => {
        return acc.concat(currentValue)
    }, []);
    if (transformedingredients.length === 0) {
        transformedingredients=<p>please start adding Ingredients </p>
    }
   // console.log(transformedingredients);

    return (
      <div className="Burger">
      <BurgerIngredients type="bread-top" />
        {transformedingredients}
            <BurgerIngredients type="bread-bottom" />
            
      </div>
    );
}

export default Burger