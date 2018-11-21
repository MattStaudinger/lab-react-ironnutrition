import React, { Component } from "react";
import "./App.css";
import "bulma/css/bulma.css";
import foods from "./foods.json";
import FoodBox from "./FoodBox";
import FoodList from './FoodList'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      food: foods,
      isClicked: false,
      inputCalories: "",
      inputName: "",
      inputSearch: "",
      list: []
    };
  }

  handleClick(e) {
    this.setState({ isClicked: true });
  }

  handleChange(e) {
    let isInSearch = false;
    if (e.target.name === "name") {
      this.setState({ inputName: e.target.value });

    } else if (e.target.name === "calories") {
      this.setState({ inputCalories: e.target.value });

    } else if (e.target.name === "search") {
      let newFoodList = foods.filter(foodItem => {
        let inputLowerCase = e.target.value.toLowerCase();
        let foodItemLowerCase = foodItem.name.toLowerCase();

        this.setState({ inputSearch: e.target.value });

        for (let i = 0; i < e.target.value.length; i++) {
          if (inputLowerCase[i] === foodItemLowerCase[i]) isInSearch = true;
          else {
            isInSearch = false;
            break;
          }
        }
        if (e.target.value.length === 0) isInSearch = true;
        return isInSearch;
      });
      console.log(isInSearch, newFoodList);

      this.setState({ inputSearch: e.target.value, food: newFoodList });
    }
  }

  handleSubmit(e) {
    this.setState({
      food: [
        ...foods,
        {
          name: this.state.inputName,
          calories: this.state.inputCalories,
          quantity: 1
        }
      ],
      isClicked: false,
      inputCalories: "",
      inputName: ""
    });
  }

  addItem(e,i) {
    this.setState({list: [...this.state.list, {
      name: foods[i].name,
      calories: foods[i].calories,
      quantity: foods[i].quantity
    }]})
    }
  

  render() {
    return (
      <div className="App">
      <div className="left">
        {!this.state.isClicked && (
          <button
            className="button is-medium is-success"
            onClick={e => {
              this.handleClick(e);
            }}
            type="button"
          >
            Add
          </button>
        )}
        {this.state.isClicked && (
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={this.state.inputName}
              onChange={e => {
                this.handleChange(e);
              }}
            />
            <label>Calories</label>
            <input
              type="number"
              name="calories"
              value={this.state.inputCalories}
              onChange={e => {
                this.handleChange(e);
              }}
            />
            <button
              className="button is-medium is-danger"
              onClick={e => {
                this.handleSubmit(e);
              }}
              type="button"
            >
              Submit
            </button>
          </div>
        )}

        <input
          type="text"
          name="search"
          value={this.state.search}
          onChange={e => {
            this.handleChange(e);
          }}
        />


        {this.state.food.map((foodItem, i) => {
          return <FoodBox onClick={(e) => this.addItem(e, i)} key={i} food={foodItem} />;
        })}
        </div>
        <div className="right">
        <FoodList list={this.state.list}/>  
        </div>

      </div>
    );
  }
}

export default App;
