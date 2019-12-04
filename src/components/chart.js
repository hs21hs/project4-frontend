import React, { Component } from 'react';
import { VictoryChart, VictoryGroup, VictoryArea } from 'victory';

class Chart extends React.Component {
    constructCalories = (macro)=>{
           const caloriesObj = this.props.weeksMeals.map((day,index)=>{
                const arFood_ids = day.map((meal)=>{return meal.food_id})
                const calsAr = arFood_ids.map((fid)=>{
                    const cFood = this.props.foods.find((food)=>{return food.id === fid})
                    return cFood[macro]
                })

                const totalCals = calsAr.reduce((a, b) => a + b, 0)

                const x= index+1
                const y = totalCals
                return {x,y}
           })  
           return caloriesObj
    }

    render() {
      return (
         
        <VictoryChart width={400} height={400}>
            
          <VictoryGroup
            style={{
              data: { strokeWidth: 3, fillOpacity: 0.4 }
            }}
          >
            <VictoryArea
            name = "calories"
              style={{
                data: { stroke: "cyan" }
              }}
              data={
                this.constructCalories("calories")}
            />
            <VictoryArea
            name = "protein"
              style={{
                data: { stroke: "purple" }
              }}
              data={
                this.constructCalories("protein")}
            />
            <VictoryArea
            name = "carbs"
              style={{
                data: { stroke: "red" }
              }}
              data={
                this.constructCalories("carbs")}
            />
            <VictoryArea
            name = "fat"
              style={{
                data: { stroke: "green" }
              }}
              data={
                this.constructCalories("fat")}
            />
          </VictoryGroup>
        </VictoryChart>
      );
    }
  }
  
export default Chart