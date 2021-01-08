# Project Name
> Budgety

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Coding Examples](#code-examples)
* [Features](#features)
* [Status](#status)
* [Contact](#contact)

## General info
A simple one page budgeting app built in JavaScript :)

## Technologies
* HTML5
* CSS3
* JavaScript

## Code Examples
A small section of the JS in this project:
```
Expense.prototype.calcPercentage = function (totalIncome) {
      
        if (totalIncome > 0) { 
            this.percentage = Math.round((this.value / totalIncome) * 100);
        }
        
        else {
            this.percentage = -1;
        }
    };
````
    

## Features

* Ability to add and remove rows
* Calculates income vs expenses
* Quickly choose between income vs expenses using a small dropdown

To-do list:
* Visually improve design
* More mobile friendly

## Status
Project is: In progress due to potential improvements


## Contact
Created by [@flynerdpl](https://www.flynerd.pl/) - feel free to contact me!
