import React, { Component } from 'react';


class DaysMeals extends Component {

    

    // componentDidMount(){
    //     this.props.setFilteredMeals()
    // }
       
    //created_at: "2019-12-03T13:59:40.057Z"
     handleUpdateMeal = (e) => {
         e.preventDefault()
       const eaten_card = {eaten_card:{food_id: e.target.elements.ufood.value,
        id: e.target.id}}
        this.props.updateMeal(eaten_card)
     }

    render(){
        return (
        <div>
           { this.props.filteredMeals.map((meal) => {
                console.log(meal)
                const chosenFood = this.props.foods.find((food) => {return food.id === meal.food_id})
           return( 
           <div>
               <p>{chosenFood.name}</p>
               <p>{chosenFood.calories}kcal</p>
               <button id ={meal.id} onClick= {(e) => {this.props.handleDeleteMeal(e)}}>delete</button>

                <form id = {meal.id} onSubmit = {(e) => {this.handleUpdateMeal(e)}}>
               <select name = "ufood">
                {this.props.foods.map((food) => {
                    return(<option value={food.id}>{food.name}</option>)
                })}
                </select>
                <button type = "submit">update</button>
                </form>
            </div>
           )
            })}
        

        </div>
        );
    }
}
export default DaysMeals;