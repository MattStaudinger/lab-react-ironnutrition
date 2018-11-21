import React, { Component } from 'react';
import 'bulma/css/bulma.css';


class FoodList extends Component {
  render() {
    return (
      <div className="box">
         <h2>Todays food</h2>

      {this.props.list.map(food => (
        <ul>
          <li>{`${food.quantity} ${food.name} = ${food.calories} cal`} </li>
        </ul>
      ))
      }
      {/* {console.log(this.props.list)}
      {(this.props.list.length !== 0 && 
      <h2>Total: {this.props.list.reduce((acc, el) => {
        return acc + el.calories
    })}</h2>)} */}

      {/* {console.log(this.props.list)}  */}

         

      </div>
    );
  }
}

export default FoodList;
