class Transaction {
  constructor(id, amount, description, date) {
    this.id = id;
    this.amount = amount;
    this.description = description;
    this.date = date;
  }
}

class TransactionList {
  constructor() {
    this.incomeList = [];
    this.expenseList = [];
    this.lastIncomeId = 0;
    this.lastExpenseId = 0;
  }

  addNewIncome(description, amount) {
    let date = new Date();
    this.lastIncomeId = this.lastIncomeId + 1;
    this.incomeList.push(
      new Transaction(
        this.lastIncomeId,
        amount,
        description,
        `${allMonths[date.getMonth()].substr(
          0,
          3
        )}. ${date.getDate()}, ${date.getFullYear()}`
      )
    );
  }

  addNewExpense(description, amount) {
    let date = new Date();
    this.lastExpenseId = this.lastExpenseId + 1;
    this.expenseList.push(
      new Transaction(
        this.lastExpenseId,
        amount,
        description,
        `${allMonths[date.getMonth()].substr(
          0,
          3
        )}. ${date.getDate()}, ${date.getFullYear()}`
      )
    );
  }

  removeIncome(id) {
    let index = this.incomeList.findIndex((t) => t.id === Number(id));
    if (index > -1) this.incomeList.splice(index, 1);
  }

  removeExpense(id) {
    let index = this.expenseList.findIndex((t) => t.id === Number(id));
    if (index > -1) this.expenseList.splice(index, 1);
  }

  render() {
    incomeListUL.innerHTML = "";
    expenseListUL.innerHTML = "";

    let totalIncome = 0,
      totalExpense = 0;

    this.incomeList.forEach((tran) => {
      totalIncome += tran.amount > -1 ? round(tran.amount) : 0;

      incomeListUL.insertAdjacentHTML(
        "afterbegin",
        `<div class="item" data-transaction-id="${tran.id}">
            <div class="item__description">${tran.description}</div>            
            <div class="right">
              <div class="item__value">${
                tran.amount > -1 ? "+" : "-"
              } $${Math.abs(tran.amount)}</div>
              <div class="item__delete">
                <button class="remove-transaction item__delete--btn">
                  <i class="remove-transaction ion-ios-close-outline"></i>
                </button>
              </div>
            </div>
            <div class="item__date">${tran.date}</div>
        </div>`
      );
    });

    this.expenseList.forEach((tran) => {
      totalExpense -= tran.amount < 0 ? round(tran.amount) : 0;

      expenseListUL.insertAdjacentHTML(
        "afterbegin",
        `<div class="item" data-transaction-id="${tran.id}">
              <div class="item__description">${
                tran.description
              }</div>            
              <div class="right">
                <div class="item__value">${
                  tran.amount > -1 ? "+" : "-"
                } $${Math.abs(tran.amount)}</div>   
                <div class="item__percentage">${round(
                  calculatePercentage(tran.amount, totalIncome)
                )}%</div>
                <div class="item__delete">
                  <button class="remove-transaction item__delete--btn">
                    <i class="ion-ios-close-outline remove-transaction"></i>
                  </button>
                </div>
              </div>
              <div class="item__date">${tran.date}</div>
          </div>`
      );
    });

    totalIncomeEl.innerHTML = `$${totalIncome}`;
    totalExpenseEl.innerHTML = `$${totalExpense}`;

    let budgetTotal = totalIncome - totalExpense;
    budgetTotalEl.innerHTML = `${budgetTotal < 0 ? "-" : "+"} $${Math.abs(
      round(budgetTotal)
    )}`;

    budgetExpensePerEl.innerHTML =
      calculatePercentage(totalExpense, totalIncome) + "%";
    inputDescEl.focus();
  }
}

function calculatePercentage(num1, num2) {
  return Math.round((num1 * 100) / num2);
}

function round(num) {
  return Math.round(num * 100) / 100;
}

let allMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
