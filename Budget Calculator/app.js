const transactionList = new TransactionList();

const budgetMonthEl = document.querySelector("#budgetMonth");
const totalIncomeEl = document.querySelector("#totalIncome");
const totalExpenseEl = document.querySelector("#totalExpense");
const budgetTotalEl = document.querySelector("#budgetTotal");
const budgetExpensePerEl = document.querySelector("#budgetExpensePer");

const incomeListUL = document.querySelector("#incomeList");
const expenseListUL = document.querySelector("#expenseList");

const formEl = document.getElementsByTagName("form")[0];
const inputDescEl = document.querySelector("#inputDesc");
const inputAmountEl = document.querySelector("#inputAmount");

function handleAddTransaction(e) {
  e.preventDefault();
  if (inputDescEl.value.trim() !== "" && inputAmountEl.value.trim() !== "") {
    if (inputAmountEl.value > -1) {
      transactionList.addNewIncome(inputDescEl.value, inputAmountEl.value);
    } else {
      transactionList.addNewExpense(inputDescEl.value, inputAmountEl.value);
    }
    inputDescEl.value = "";
    inputAmountEl.value = "";

    transactionList.render();
  }
}

function handleRemoveIncome(e) {
  const el = e.target;

  debugger;
  if (el.classList.contains("remove-transaction")) {
    transactionList.removeIncome(
      el.closest("div").parentNode.parentNode.dataset.transactionId
    );
    transactionList.render();
  }
}

function handleRemoveExpense(e) {
  const el = e.target;

  debugger;
  if (el.classList.contains("remove-transaction")) {
    transactionList.removeExpense(
      el.closest("div").parentNode.parentNode.dataset.transactionId
    );
    transactionList.render();
  }
}

formEl.addEventListener("submit", handleAddTransaction);
incomeListUL.addEventListener("click", handleRemoveIncome);
expenseListUL.addEventListener("click", handleRemoveExpense);
budgetMonthEl.innerHTML = `${
  allMonths[new Date().getMonth()]
} ${new Date().getFullYear()}`;
