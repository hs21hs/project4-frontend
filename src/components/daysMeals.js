import React, { Component } from 'react';


class DaysMeals extends Component {

    

    componentDidMount(){
        this.props.setFilteredMeals()
    }
       
    //created_at: "2019-12-03T13:59:40.057Z"
     

    render(){
        return (
        <div>
           { this.props.filteredMeals.map((meal) => {
                console.log(meal)
                const chosenFood = this.props.foods.find((food) => {return food.id === meal.food_id})
           return( 
           <div>
               <p>{chosenFood.name}</p>
               <button id ={meal.id} onClick= {(e) => {this.props.handleDeleteMeal(e)}}>delete</button>
            </div>
           )
            })}
        

        </div>
        );
    }
}
export default DaysMeals;