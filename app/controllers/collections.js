let toggleButton = document.querySelector('#toggleButton')
let contentNone = document.querySelector('#contentNone')

let isContentExpanded = true;

toggleButton.addEventListener('click', function() {
    if (isContentExpanded) {
      // Thu gọn nội dung
      contentNone.style.maxHeight = '0';
    } else {
      // Mở rộng nội dung
      contentNone.style.maxHeight = '800px';
    }
  
    isContentExpanded = !isContentExpanded;
  });
  