import React, {Component} from "react" 

class CreateFood extends Component{

    handleSubmit = (e)=>{
        e.preventDefault()
        console.log(e.target.elements.food_name.value)
        const food = {
            name: e.target.elements.food_name.value,
            calories: e.target.elements.calories.value,
            protein: e.target.elements.protein.value,
            carbs: e.target.elements.carbs.value,
            fat: e.target.elements.fat.value}
        this.props.handleCreate(food)
    }

    render(){
        return(

            <form onSubmit = {this.handleSubmit}>
                <label>food name</label> 
                <input name="food_name"></input>
                <label>calories</label>
                <input name="calories"></input>
                <label>protein</label>
                <input name="protein"></input>
                <label>carbs</label>
                <input name="carbs"></input>
                <label>fat</label>
                <input name="fat"></input>
                <button type= "submit"> submit</button>
            </form>
        
        )
        
    }

}

export default CreateFood;