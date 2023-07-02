var toggleButton = document.querySelector('#toggleButton')
var contentNone = document.querySelector('#contentNone')

var isContentExpanded = true;
var contentHeight = contentNone.scrollHeight; // Lấy chiều cao thực tế 

toggleButton.addEventListener('click', function() {
    if (isContentExpanded) {
      // Thu gọn nội dung
      contentNone.style.maxHeight = '0';
    } else {
      // Mở rộng nội dung
      contentNone.style.maxHeight = contentHeight + 'px';
    }
  
    isContentExpanded = !isContentExpanded;
  });
  