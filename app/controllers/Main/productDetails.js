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


// đánh giá 
const stars = document.querySelectorAll('.star');

function handleStarClick(event) {
  const value = event.target.getAttribute('data-value');
  highlightStars(value);
  // Thực hiện các hành động khác dựa trên giá trị đánh giá
}

function highlightStars(value) {
  stars.forEach(star => {
    const starValue = star.getAttribute('data-value');
    if (starValue <= value) {
      star.classList.add('active');
    } else {
      star.classList.remove('active');
    }
  });
}

stars.forEach(star => {
  star.addEventListener('click', handleStarClick);
});


// thu gọn nội dung
const toggleButton = document.querySelector('#toggleButton');
const content = document.querySelector('#content');

let isContentExpanded = true;

toggleButton.addEventListener('click', function() {
  if (isContentExpanded) {
    //Mở rộng nội dung
    content.style.display = 'block';
  } else {
    //Thu gọn nội dung
    content.style.display = 'none';
  }

  isContentExpanded = !isContentExpanded;
});
