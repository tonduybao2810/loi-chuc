MỘT NGÀY MỘT LỜI CHÚC

CÁCH CHẠY
1. Giải nén thiep-chuc-mung.zip.
2. Mở index.html bằng trình duyệt hiện đại để xem thử.
3. Để đưa website lên Vercel: tạo project mới, tải toàn bộ các tệp/thư mục lên GitHub rồi import repository đó trong Vercel. Framework Preset chọn Other, Build Command để trống, Output Directory là . (root). Website là HTML/CSS/JS thuần nên không cần backend hay database.

CÁCH HOẠT ĐỘNG
- Tự nhận diện ngày hiện tại theo giờ của trình duyệt người xem.
- Tự chọn mẫu giao diện theo ngày lễ; ngày thường dùng lời chúc ngày mới/cuối tuần.
- Mỗi lần mở trang, lời chúc được chọn ngẫu nhiên từ danh sách tương ứng. Vì vậy người A và người B có thể thấy câu khác nhau, dù cùng dùng một đường link. Đây là ngẫu nhiên phía trình duyệt, không lưu danh tính hay lượt xem.
- Dòng “Thân gửi” đổi theo dịp, ví dụ 20/10 gửi đến toàn thể chị em phụ nữ, 20/11 gửi đến quý thầy cô.

THÊM / SỬA LỜI CHÚC
- data/holidays.js: ngày, tiêu đề, tên ngày lễ, màu sắc giao diện.
- script.js: danh sách câu chúc ngẫu nhiên trong biến variants. Thêm các câu vào mảng tương ứng với id của ngày lễ.
- Tết Âm lịch đổi ngày theo từng năm. Hãy xác minh lịch chính thức rồi cập nhật window.LUNAR_DATES trong data/holidays.js. Ví dụ trong tệp chỉ là mẫu định dạng, không phải dữ liệu đã xác minh.

CẤU TRÚC
- index.html: trang lời chúc
- style.css: giao diện responsive và hiệu ứng
- script.js: nhận diện ngày, chọn ngẫu nhiên lời chúc
- data/holidays.js: danh sách ngày lễ dương lịch
