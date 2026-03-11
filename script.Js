

let totalIncome = 0;
let totalExpense = 0;
let totalProfit = 0;


let stringItems = localStorage.getItem("items")

let items = [];

if (stringItems) {
    items = JSON.parse(stringItems)
}

printData()

function getItems() {
    let userItem = document.getElementById("ItemName").value;
    let userAmount = Number(document.getElementById("Amount").value);
    let object = {}
    for (let i = 0; i < items.length; i++) {
        if (items[i].name == userItem) {
            alert("Already add this item")
            return
        }

    }
    if (userAmount < 0) {
        let filterAmount = -(userAmount);
        object = {
            name: userItem,
            amount: filterAmount,
            type: "Loss"
        }

        totalExpense += filterAmount;

    } else {
        object = {
            name: userItem,
            amount: userAmount,
            type: "Profit"
        }

        totalIncome += userAmount;
    }

    totalProfit = totalIncome - totalExpense;

    items.unshift(object);
    let arrayString = JSON.stringify(items);
    localStorage.setItem("items", arrayString);
    printData()

}

function printData() {
    document.getElementById("totalIncome").innerHTML = `${totalIncome}<span>Rs</span>`;
    document.getElementById("totalExpense").innerHTML = `${totalExpense}<span>Rs</span>`;
    document.getElementById("totalProfit").innerHTML = `${totalProfit}<span>Rs</span>`;


    let listData = "";

    for (let i = 0; i < items.length; i++) {

        let listDataColor;
        if (items[i].type == "Loss") {
            listDataColor = "red"

        } else {
            listDataColor = "green"
        }

        listData +=
            `<div class="list ${listDataColor}">
                <h3>${items[i].name}</h3>
                <h3>${items[i].amount}<span>Rs</span></h3>
            </div>`
    }

    document.getElementById("listDetail").innerHTML = listData;
}