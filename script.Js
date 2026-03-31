
let totalIncome = Number(localStorage.getItem("totalIncome")) || 0;
let totalExpense = Number(localStorage.getItem("totalExpense")) || 0;
let totalProfit = Number(localStorage.getItem("totalProfit")) || 0;

let stringItems = localStorage.getItem("items")

let items = [];

if (stringItems) {
    items = JSON.parse(stringItems)
}

printData();

function getItems() {
    let name = document.getElementById("ItemName").value.trim();
    let amount = Number(document.getElementById("Amount").value);

    if (!name || !amount) {
        alert("⚠️ Enter valid data");
        return;
    }

    if (items.find(item => item.name.toLowerCase() === name.toLowerCase())) {
        alert("⛔ Item already exists");
        return;
    }

    let obj;

    if (amount < 0) {
        obj = { name, amount: Math.abs(amount), type: "Loss" };
        totalExpense += Math.abs(amount);
    } else {
        obj = { name, amount, type: "Profit" };
        totalIncome += amount;
    }

    totalProfit = totalIncome - totalExpense;

    items.push(obj);

    saveData();
    clearInputs();
    printData();
}

function deleteItem(index) {
    let item = items[index];

    if (item.type === "Loss") {
        totalExpense -= item.amount;
    } else {
        totalIncome -= item.amount;
    }

    totalProfit = totalIncome - totalExpense;

    items.splice(index, 1);

    saveData();
    printData();
}

function saveData() {
    localStorage.setItem("items", JSON.stringify(items));
    localStorage.setItem("totalIncome", totalIncome);
    localStorage.setItem("totalExpense", totalExpense);
    localStorage.setItem("totalProfit", totalProfit);
}

function clearInputs() {
    document.getElementById("ItemName").value = "";
    document.getElementById("Amount").value = "";
}

function printData() {
    document.getElementById("totalIncome").innerHTML = totalIncome + " Rs";
    document.getElementById("totalExpense").innerHTML = totalExpense + " Rs";
    document.getElementById("totalProfit").innerHTML = totalProfit + " Rs";

    let html = "";

    for (let i = 0; i < items.length; i++) {
        let color;
        if (items[i].type === "Loss") {
            color = "red";
        } else {
            color = "green";
        }

        html += `
        <div class="list ${color}">
            <span>${items[i].name}</span>
            <div class="right">
                <span>${items[i].amount}/Rs</span>
                <button onclick="deleteItem(${i})" class="deleteBtn"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </div>`;
    }

    document.getElementById("listDetail").innerHTML = html;
}