import React, { Component } from 'react';
import NewFoodForm from './components/newFoodForm';
import SignUp from './components/signUp';
import Login from './components/login';
import Logout from './components/logout';
import DaysMeals from './components/daysMeals';

class Home extends Component {

    state = {users: [],
        foods: [],
        eaten_cards: [],
        filteredMeals:[],
        currentDate: undefined,
        selectedDate: undefined,
        currentUserId: 0,
    
    }

componentDidMount(){
    fetch("http://localhost:3000/users")
    .then(resp => resp.json())
    .then(json => this.setState({users:[...json]}))

    fetch("http://localhost:3000/foods")
    .then(resp => resp.json())
    .then(json => this.setState({foods:[...json]}))

    fetch("http://localhost:3000/eaten_cards")
    .then(resp => resp.json())
    .then(json => this.setState({eaten_cards:[...json]}))

    
        const currentdate = new Date();  

        let day = currentdate.getDate()
        let month = currentdate.getMonth()+1 
        let year = currentdate.getFullYear()
        if (day < 10) {day = "0"+day}
        if (month < 10) {month = "0"+month}

         const date = year+"-"+month+"-"+day
            this.setState({currentDate: date})
            this.setState({selectedDate: date})
            

}

eatFood = (e) => {
    
    fetch("http://localhost:3000/eaten_cards", {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({eaten_card:{food_id: e.target.previousSibling.value, user_id: this.state.currentUserId}})
            })
            .then(resp => resp.json())
            .then(json => this.setState({eaten_cards:[...this.state.eaten_cards,json]}))
    
}



setFilteredMeals = () => {
    const filteredMeals =(this.state.eaten_cards.filter((meal) => {
       const mealDateAr = meal.created_at.split("")
       const formattedMealDate = (mealDateAr.slice(0,10)).join("")
       
       return(formattedMealDate === this.state.selectedDate)
   }))

  this.setState({filteredMeals: [...filteredMeals]})
    
}

loginNewUser = (user) => {
    this.setState({currentUserId: user.id})
}

deleteMeal = (e) => {
 fetch("http://localhost:3000/eaten_cards/"+e.target.id, {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    method: 'delete'
  })
  .then(e.target.parentElement.remove()) 
}
     
whichPage = () => {
if (this.state.currentUserId === 0){
    return(
        <div>
            <p>hello user1</p>
            <SignUp users = {this.state.users} handleLogin = {this.loginNewUser}/>
            <Login users = {this.state.users} handleLogin = {this.loginNewUser}/>
        </div>
    )
}else{
    return(
    <div>
        <Logout handleLogout = {this.handleLogout}/>
        <NewFoodForm foods = {this.state.foods} handleEatenClick = {this.eatFood} todaysDate = {this.state.currentDate}/>
        <DaysMeals  handleDeleteMeal = {this.deleteMeal} setFilteredMeals = {this.setFilteredMeals} filteredMeals ={this.state.filteredMeals} foods = {this.state.foods}/>
   </div>  
    )
}
}

handleLogout = () => {
    this.setState({currentUserId: 0})
}


    render(){
        return (
            this.whichPage()
        );
    }
}
export default Home;