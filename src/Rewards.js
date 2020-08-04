import React, { Component } from "react";

// Given: priceList containing a customer's transactions in 3 months
// Working Functionalities: 
// 1. Add expenses in a priceList by pressing 'Enter' or clicking '+' button with auto calculation of reward points
// 2. Delete last added expense with auto adjust to reward points by clicking '-' button

class Rewards extends Component {
    constructor() {
        super();
        this.state={
            amount: 0,
            totalRewardPoints: 0,
            //monthlyRewardPoints: [], ----------------> check eof
            priceList: []
        }
    }
    calculateRewards(amount) {
        if (amount > 50 && amount < 100) {
            return amount-50;
        } else if (amount > 100){
            return (50 + 2*(amount-100));
        }
        return 0;
    }
    handleChange(event) {
        this.setState({
            amount: event.target.value
        })
    }
    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            const itemToAdd = parseInt(this.state.amount);
            this.setState({
                priceList: [itemToAdd, ...this.state.priceList],
                totalRewardPoints: this.state.totalRewardPoints + this.calculateRewards(itemToAdd)
            })
        }
      }
    handleAdd() {
        const itemToAdd = parseInt(this.state.amount);
        this.setState({
            priceList: [itemToAdd, ...this.state.priceList],
            totalRewardPoints: this.state.totalRewardPoints + this.calculateRewards(itemToAdd)
        })
      }
    handleDelete() {
        const itemDeleted = this.state.priceList.shift();
        const itmDel = parseInt(itemDeleted);
        this.setState({
          totalRewardPoints: this.state.totalRewardPoints - this.calculateRewards(itmDel),
          priceList: [...this.state.priceList]
        });
    }
    render() {
        const expense = this.state.priceList.map((item) => {
            return <li> {item} </li>;
         });
        return (
        <div className= "content">
            <div className= "flex">
                <input type="text" id="useramount" placeholder="Expenditure Amount" onChange={this.handleChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)} />
                <div>
                    <button type="button" class="button add-btn" onClick={this.handleAdd.bind(this)}>+</button>
                </div>
                <div>
                    <button type="button" class="button delete-btn" onClick={this.handleDelete.bind(this)}>-</button>
                </div>
            </div>
            <h3>Total Reward Points = {this.state.totalRewardPoints}</h3>
            <ul>
                {expense}
            </ul>
        </div>
        );
    }
}

export default Rewards;

// Else 3 month transactions can be filtered using Date()
    
    // When complete data is given transaction could be made a separate component so each amount would have rewards and date associated with it:
    // class Transaction {
    //     constructor(amount) {
    //         this.amount = amount;
    //         this.rewards = calculateRewards(amount);
    //         this.transactionDate = new Date();
    //     }
    // }
    // then rewards per month can be calculated using: 
    // rewardsPerMonth() {
    //     let monthlyRewards = [];
    //     for(let i=0; i<3; i++) {
    //         let monthlyPoints = this.priceList.filter(amount => amount.transactionDate.getMonth() == (new Date).getMonth() - i );
    //         monthlyRewards[i] = monthlyPoints.reduce((mnth,key)=>key.rewards+mnth,0);
    //     }
    //     return monthlyRewards;
    // }