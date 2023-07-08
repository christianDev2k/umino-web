let toggleButton = document.querySelector('#toggleButton')
let contentNone = document.querySelector('#contentNone')

let isContentExpanded = true;

toggleButton.addEventListener('click', function() {
    if (isContentExpanded) {
      // Mở rộng nội dung
      contentNone.style.maxHeight = '800px';
      toggleButton.innerHTML = '<i class="fa-solid fa-xmark"></i> Filter'
      toggleButton.style.backgroundColor = 'white';
      toggleButton.style.borderColor = 'black';
      toggleButton.style.color = 'black';
    } else {
      // thu gọn nội dung
      contentNone.style.maxHeight = '0';
      toggleButton.innerHTML = '<i class="fa-solid fa-filter"></i> Filter';
      toggleButton.style.backgroundColor = 'black';
      toggleButton.style.borderColor = 'white';
      toggleButton.style.color = 'white';
    }
  
    isContentExpanded = !isContentExpanded;
  });
  

