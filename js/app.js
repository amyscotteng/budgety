//Module pattern - Budget controller

var budgetController = (function() {
   
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };
    
    
    Expense.prototype.calcPercentage = function (totalIncome) {
      
        if (totalIncome > 0) { 
            this.percentage = Math.round((this.value / totalIncome) * 100);
        }
        
        else {
            this.percentage = -1;
        }
    };
    
    
    Expense.prototype.getPercentage = function () {
        return this.percentage;
    };
    
    
    
    
    
     var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    
    var calculateTotal = function(type) {
      var sum = 0;
      data.allItems[type].forEach(function(cur) {
          sum += cur.value;
      });
        
        data.totals[type] = sum;
    };
    
    
    
    var allExpenses = [];
    var allIncomes= [];
    var totalExpenses = 0;
    
    var data = {
        allItems: {
            exp:[],
            inc: []
        },
        
        totals: {
            exp: 0,
            inc: 0
        },
        
        budget: 0,
        percentage: -1
        
        
    };
    
    return {
        addItem: function(type, des, val) {
            var newItem, ID;
            
            //[1 2 3 4 5 ], next ID = 6
            
            // ID = last ID + 1
            
            //Creates new ID 
            if (data.allItems[type].length > 0) {
                ID =  data.allItems[type][data.allItems[type].length - 1].id + 1;    
            }
            
            else {
                ID = 0;
            }
            
            
            
            //Creates new item based on income or expense type
            
            
            if(type === 'exp') {
                newItem =  new Expense(ID, des, val);    
            }
            
            else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            
            
            
            // Push1es it into our data structure
            data.allItems[type].push(newItem);
            
            
            // Returns the new element
            return newItem;
             
        },
        
        
        deleteItem: function (type, id) {
          var ids, index;
            
            var ids = data.allItems[type].map(function(current) {
               return current.id;
                
            });
            
            index = ids.indexOf(id);
            
            if (index !== -1) {
                data.allItems[type].splice(index, 1)
            };
        },
        
        
        calculateBudget: function(){
            
            // Calculates total income and expenses
            
            calculateTotal('exp');
            calculateTotal('inc');
            
            
            // Calculates budget income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            
            // Calculates % of income spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }
            
            else {
                data.percentage = -1;
            }
            
        },
        
        
        
        calculatePercentages: function() {
          
            data.allItems.exp.forEach(function(cur){
               cur.calcPercentage(data.totals.inc); 
                
            });
            
            
        },
        
        getPercentages: function() {
            var allPerc = data.allItems.exp.map(function(cur) {
               return cur.getPercentage(); 
            });   
            
            return allPerc;
        },
        
        
        
        
        getBudget: function(){
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },
        
        
        
        
        
        
        
        
        
        testing: function() {
            console.log(data);
        }
        
};
    
    
    
    

})();








//Module pattern - UI Module pattern

var UIController = (function() { 

    
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container:'.container',
        expensesPercLabel:'.item__percentage',
        dateLabel: '.budget__title--month'
        
    };
    
    var formatNumber = function (num, type) {
        
        var numSplit, int, dec, type;
        
    
        num = Math.abs(num);  
        
        //Two decimal points    
        num = num.toFixed(2);    
            
            
        numSplit = num.split('.');
            
            
        int = numSplit[0];
        
        //Comma seperates the thousands    
            
        if (int.length > 3 ) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }   
            
        dec = numSplit[1];
            
        
        //+ or - before number    
            
        
        
        return (type === 'exp' ?  '-' : '+') + ' $' + int + '.' + dec;
        
        
        };
    
    
      var nodeListForEach = function(list, callback) {
                for (var i = 0; i < list.length; i++) {
                    callback(list[i], i);
                }
      };
    
    
    
    
    
    return {
        getInput: function() {
            
            return {
                type: document.querySelector(DOMstrings.inputType).value,  //Will either be income or expense
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value) //Converts string to a number
            };
            
        },
        
        addListItem: function(obj, type) {
            
            var html, newHTML, element;
            
            //Creates HTML string with placeholder text
            
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            
            }
            
            else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
            
                html = '<div class="item clearfix" id="exp-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div>'; 
            }
            
            //Replaces the placeholder text with actual data received from object
            
            newHTML = html.replace('%id%', obj.id);
            newHTML = newHTML.replace('%description%', obj.description);
            newHTML = newHTML.replace('%value%', formatNumber(obj.value, type));
            
            // Inserts HTML into the DOM
            
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
        },
        
        deleteListItem: function (selectorID) {
            
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },
        
        
        clearFields: function() {
        var fields, fieldsArr;    
          fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);  
            
          fieldsArr = Array.prototype.slice.call(fields);  
            
            
          fieldsArr.forEach(function(current, index, array) {
             current.value = ""; 
          });  
            
            fieldsArr[0].focus();
        },
        
        displayBudget: function(obj) {
            
            var type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';
            
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.totalExp, 'exp');
            
            
            if(obj.percentage > 0 ) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            }
            
            else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
            
        },
        
        
        displayPercentages: function(percentages) {
            
            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
        
          
            
            nodeListForEach(fields, function(current, index) {
               
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                }
                
                else {
                    current.textContent = '---';
                }
                
            });
        
        
        },
        
        
        displayMonth: function() {
          var now, months, month, year;
            
            now = new Date();
            
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = now.getMonth();
            
            year = now.getFullYear();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
            
        },
        
            
            changedType: function() {
                
                var fields = document.querySelectorAll(
                
                    DOMstrings.inputType + ',' +
                    DOMstrings.inputDescription + ',' +
                    DOMstrings.inputValue);
        
            
            nodeListForEach(fields, function(cur){
                
               cur.classList.toggle('red-focus');
                
            });
                
               document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
        
            },
        
            getDOMstrings: function(){
            return DOMstrings;
        }
    };
    
})();




//Seperations of concerns: each part of the application should be interested in doing one thing independently

//Global app controller

var controller = (function(budgerCtrl, UICtrl) {
    
     //Event listener
    
    var DOM = UICtrl.getDOMstrings();
    
    var setupEventListeners = function() {
         
        
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    
    //Keypress event; allows user to hit return instead of pressing the add button
    
        document.addEventListener('keypress', function(event) {
                              
        if(event.keyCode === 13 || event.which === 13) {
                
            ctrlAddItem();
                
        }
        
    });
        
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
        
};
    
//Public initialization function    
    
   var updateBudget= function() {
       
        // Calculates budget
       
       budgerCtrl.calculateBudget();
       
       
        // Returns budget
        
       var budget = budgerCtrl.getBudget();
       
        // Displays budget on the UI
       
       UICtrl.displayBudget(budget);
       
    };
    
    
    var updatePercentages = function () {
          
            //Calculates percentages
            budgerCtrl.calculatePercentages();
            
            // Reads percentages from budget controllers
            var percentages = budgerCtrl.getPercentages();
            
            // Updates UI
            
            UICtrl.displayPercentages(percentages);
        };
    
    var ctrlAddItem = function() {
        
        var input, newItem;
        
        // Gets field input data
        
       input = UICtrl.getInput();
        
        if(input.description !== "" && !isNaN(input.value) && input.value > 0 ) {
              // Adds item to budget controller
        
        newItem = budgerCtrl.addItem(input.type, input.description, input.value);
        
        // Adds new item to UI
        UICtrl.addListItem(newItem, input.type);
        
        //Clears the field
        UICtrl.clearFields();
        
        //Calculates and updates budget
            
        updateBudget();
            
            
        // Calculates and updates percentages   
            
       updatePercentages();
            
    
    }
        
        

};
    
    var ctrlDeleteItem = function (event) {
       var itemID, splitID, type, ID; 
        
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if (itemID) {
            
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
         
        
        // Deletes item from data strcture
        
        budgerCtrl.deleteItem(type, ID);
        
        // Deletes item from the UI
        
        UICtrl.deleteListItem(itemID);
        
        // Updates & shows new budget
        updateBudget();
        
        // Calculates and updates percentages
            
        updatePercentages();    
            
            
            
        }
    };
    
    return {
        init: function() {
            console.log('Application has started.');
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            
            setupEventListeners();
        }
    };
    
    
})(budgetController, UIController);

controller.init();




