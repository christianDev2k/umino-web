# umino-web
# INPUT
- Thông tin sản phẩm
- URL API: https://64a28223b45881cc0ae540aa.mockapi.io/ProductsList

# PROCESS
- Mock API (đã mockAPI xong)
- Xây dựng contructor Product (đã xong)
- Xây dựng contructor ProductList (đã xong).
- Xây dựng function:
    + Validate (đã xong).
    + RenderHTML (array, string): RenderHTML. Tham số truyền vào là 1 mảng và 1 string html.
    
    + GetData: Lấy dữ liệu từ API
    + PostData: Tạo mới sản phẩm vào API.
    + DeleteData: Xóa sản phẩm khỏi API.
    + PutData: Chỉnh sửa sản phẩm trong API.

    + AddProduct : Tạo mới sản phẩm.
    + DeleteProduct: Xóa sản phẩm.
    + EditProduct: Chỉnh sửa sản phẩm.
    + SearchProduct: Tìm kiếm sản phẩm.
    + FilterProduct: Lọc sản phẩm.
    + ArangeProduct: Sắp xếp sản phẩm.
    
    + SetLocalStorage: Lưu giỏ hàng.
    + GetLocalStorage: Lấy thông tin và render giỏ hàng.
    
    + AddToCart: Thêm sản phẩm vào giỏ hàng.
    + DeleteCart: Xóa sản phẩm khỏi giỏ hàng.
    + UpdateCart: Chỉnh sửa sản phẩm trong giỏ hàng.

# OUTPUT
## Page User
- Hiển thông tin sản phẩm ra Landing Page, Collection, Cart Page, Product Detail.
- Cho phép người dùng lọc sản phẩm trong page Collection.

- User thực hiện được tính năng thêm sản phẩm vào giỏ hàng 
    + Hiển thị modal cho người dùng chọn ontion trước khi add to cart.
    + Khi thêm sản phẩm. Nếu sản phẩm chưa có trong giỏ hàng thì push sản phẩm vào giỏ hàng. Nếu có rồi thì chỉ cần cộng số lượng thêm 1 đơn vị.
    + Lưu giỏ hàng vào Local Storage.

- Trong page Cart Page và Modal Cart. 
    + Cho phép người dùng chỉnh sửa số lượng.
    + Cho phép người dùng remove sản phẩm khỏi giỏ hàng.
    + Tính tổng tiền.
    + Clear giỏ hàng khi nhấn nút thanh toán.

## Page Admin.
- Hiển thị danh sách sản phẩm.
- Thêm sản phẩm (Kiểm tra validate).
- Chỉnh sửa sản phẩm (Kiểm tra validate).
- Xóa sản phẩm.
- Tìm kiếm sản phẩm
- Sắp xếp tăng dần / giảm dần theo giá tiền.

# EXTRA
- Xây dựng tính năng wishlist (lưu vào Local Storage).


