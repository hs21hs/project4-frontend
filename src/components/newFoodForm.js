import React, { Component } from 'react';


class NewFoodForm extends Component {

    state = {newFood: undefined}


    handleFoodNameChange = event => {
        this.setState({
          newFood: event.target.value
        })
      }
       
    
     
    render(){
        return (
        <div>
            <p>todays date is {this.props.todaysDate}</p>

            <select>
                {this.props.foods.map((food) => {
                    return(<option value={food.id}>{food.name}</option>)
                })}
            </select>
            <button value = "submit" onClick = {e => this.props.handleEatenClick(e)}>eat</button>

        </div>
        );
    }
}
export default NewFoodForm;