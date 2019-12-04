import React, { Component } from 'react';
import NewFoodForm from './components/newFoodForm';
import SignUp from './components/signUp';
import Login from './components/login';
import Logout from './components/logout';
import DaysMeals from './components/daysMeals';
import CreateFood from './components/createFood';
import Chart from './components/chart';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
class Home extends Component {

    state = {users: [],
        foods: [],
        eaten_cards: [],
        currentDate: undefined,
        selectedDate: undefined,
        currentUserId: 0,
        showChart: true,
        weeksMeals: []
    
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
            
            fetch("http://localhost:3000//previous_weeks_meals")
    .then(resp => resp.json())
    .then(json => this.setState({weeksMeals: json}))

}

eatFood = (e) => {
    e.preventDefault()
    fetch("http://localhost:3000/eaten_cards", {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({eaten_card:{food_id: e.target.elements.eat.value, user_id: this.state.currentUserId, date: this.state.currentDate}})
            })
            .then(resp => resp.json())
            .then(json => this.setState({eaten_cards:[...this.state.eaten_cards,json]}))
    
}



filteredMeals = () => {
    const filteredMeals =(this.state.eaten_cards.filter((meal) => {
        // const mealDateAr = meal.created_at.split("")
        // const formattedMealDate = (mealDateAr.slice(0,10)).join("")

        
       const formattedMealDate = meal.date
       
       return(formattedMealDate === this.state.selectedDate && meal.user_id === this.state.currentUserId)
   }))

//   this.setState({filteredMeals: [...filteredMeals]})
    return filteredMeals
}

loginNewUser = (user) => {
    this.setState({currentUserId: user.id})
}

signUpNewUser = (user) => {
    this.setState({currentUserId: user.id})
    this.setState({users: [...this.state.users,user]})
}

deleteMeal = (e) => {
 fetch("http://localhost:3000/eaten_cards/"+e.target.id, {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    method: 'delete'
  })
  .then(this.setState({
      eaten_cards: [...this.state.eaten_cards.filter((card) => {return card.id != e.target.id})]
  }))

}
     
createFood = (food) => {
    console.log(food)
    fetch("http://localhost:3000/foods", {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(food)
            })
            .then(resp => resp.json())
            .then(json => this.setState({foods: [...this.state.foods, json]}))
}

updateMeal = (card)=>{

    fetch("http://localhost:3000/eaten_cards/"+card.eaten_card.id, {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "PATCH",
                body: JSON.stringify(card)
            })
            .then(resp => resp.json())
            .then(json => this.setState({eaten_cards: [...this.state.eaten_cards.filter((card) => {
                return card.id != json.id
            }),json]}))
}

whichPage = () => {

if (this.state.showChart === true && this.state.currentUserId !== 0){
    return <div>
        <button onClick = {()=>this.setState({showChart: false})}>day view</button>
        <Chart weeksMeals = {this.state.weeksMeals.map((day) => {return day.filter((meal)=>{return meal.user_id===this.state.currentUserId})})} foods = {this.state.foods}/>
        <p style={{color: "cyan"}}>calories</p>
        <p style={{color: "purple"}}>protein</p>
        <p style={{color: "red"}}>carbs</p>
        <p style={{color: "green"}}>fat</p>
    </div> 
}

if (this.state.currentUserId === 0){
    return(
        <div>
            <p>hello user1</p>
            <SignUp users = {this.state.users} handleLogin = {this.signUpNewUser}/>
            <Login users = {this.state.users} handleLogin = {this.loginNewUser}/>
        </div>
    )
}else{
    return(
    <div>
        <button onClick = {()=>this.setState({showChart: true})}>week view</button>
        <Logout handleLogout = {this.handleLogout}/>
        <CreateFood handleCreate = {this.createFood}/>
        <NewFoodForm foods = {this.state.foods} handleEatenClick = {this.eatFood} todaysDate = {this.state.currentDate}/>
        <DaysMeals  updateMeal = {this.updateMeal} handleDeleteMeal = {this.deleteMeal}  filteredMeals ={this.filteredMeals()} foods = {this.state.foods}/>
   </div>  
    )
}
}

handleLogout = () => {
    this.setState({currentUserId: 0})
}


    render(){
        return (
            <Router>
                <div>
                {this.whichPage()}
                <Route 
                path = "/chart" 
                render = {(props) => <Chart {...props} weeksMeals = {this.state.weeksMeals.map((day) => {return day.filter((meal)=>{return meal.user_id===this.state.currentUserId})})} foods = {this.state.foods}/>}
                />
                </div>
            </Router>
        );
    }
}
export default Home;

// setFilteredMeals = {this.setFilteredMeals}