import eventCollection from '../../app/controllers/Collections/event_collections.js';
import * as f from '../../app/controllers/Collections/fnc_collections.js';

f.setUI();
eventCollection();

// Show size

const selectSize = (size) => {
    const sizeTitleElement = document.getElementById("sizeTitle");
    sizeTitleElement.textContent= size;
  };
  
selectSize()

// xử lý chọn số lượng
let amountElement = document.querySelector('#amount')
let amount = +amountElement.value

// Xử lý handlePlus

let render = (amount) => {
    amountElement.value = amount
}

let handlePlus = () => {
    amount++
    render(amount)
}

// Xử lý handleMInus
let handleMinus = () => {
    if(amount > 1){
        amount--
        render(amount)
    }
}

amountElement.addEventListener('input', () => {
    amount = +amountElement.value
    amount = isNaN(amount) ? 1:amount;
    render(amount)
})