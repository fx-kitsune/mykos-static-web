# Trang giới thiệu MyKOS

Landing page tiếng Việt cho hệ điều hành MyKOS. Trang tĩnh HTML/CSS/JavaScript, không cần framework, không có phụ thuộc npm, không có máy chủ ứng dụng hoặc cơ sở dữ liệu.

**Chỉ chuẩn bị mã nguồn. Chưa triển khai hosting và chưa bật GitHub Pages.** Chủ repo có thể công khai và chọn cách triển khai sau.

## Nội dung

- Giới thiệu định hướng MyKOS trên nền Ubuntu/KDE.
- Thư viện ảnh tương tác của thiết kế M1, có nhãn phân biệt với ISO thực tế.
- Nền tảng kỹ thuật, công cụ KDE và tiến độ đã được xác nhận.
- Câu hỏi thường gặp và liên kết mã nguồn, tài liệu, Actions.

Không có nút tải bản ổn định, số liệu người dùng, lời chứng thực hoặc khả năng tương thích chưa kiểm chứng. Không có form thu thập thông tin, công cụ theo dõi, cookie hoặc phông tải từ dịch vụ ngoài.

## Xem cục bộ

Có thể phục vụ trực tiếp thư mục gốc bằng một máy chủ tĩnh:

```sh
python3 -m http.server 5174 --bind 127.0.0.1
```

Mở `http://127.0.0.1:5174/`. Menu đầu trang thu gọn ở màn hình hẹp. Thư viện giao diện hỗ trợ chuột, Tab, phím mũi tên, Home và End. Các câu hỏi thường gặp dùng `details` gốc của trình duyệt. Tôn trọng tùy chọn giảm chuyển động.

Trong môi trường Sites managed, `.openai/hosting.json` chỉ cấu hình thư mục xem trước `dist`, không chứa định danh Site hoặc khai báo triển khai.

## Kiểm tra và tạo bản tĩnh

Cần Node.js 18 trở lên; CI dùng Node.js 22. Không cần `npm install`.

```sh
npm run check
npm run build
```

Lệnh kiểm tra xác nhận cú pháp JavaScript, ID, điểm neo, tài nguyên ảnh và hành vi menu/tab qua DOM giả lập. Đây không phải kiểm thử hiển thị bằng trình duyệt. Lệnh build sao chép trang và tài nguyên vào `dist/`, không gọi dịch vụ triển khai. Xem [kết quả kiểm tra](VALIDATION.md).

## Công khai và hosting về sau

Có thể dùng thư mục gốc làm nguồn GitHub Pages hoặc tải nội dung `dist/` lên dịch vụ phục vụ tệp tĩnh. Tất cả đường dẫn CSS, JavaScript và ảnh là tương đối để chạy được dưới đường dẫn dự án như `/mykos-static-web/`.

Khi chủ repo sẵn sàng công khai:

1. Kiểm tra lại nội dung, nhãn ảnh M1, tiến độ và quyền truy cập các liên kết tới repo MyKOS.
2. Cấu hình hosting hoặc GitHub Pages theo lựa chọn của chủ repo. Workflow hiện tại chỉ kiểm tra, không triển khai.
3. Khi có tên miền chính thức, bổ sung `canonical`, `og:url` và ảnh Open Graph với URL tuyệt đối; không dùng tên miền mẫu.
4. Kiểm tra trực quan trên desktop, điện thoại, điều hướng bàn phím và các liên kết ngoài trước khi quảng bá.

Repo MyKOS và Artifacts có thể yêu cầu tài khoản/quyền truy cập. Trang không nhúng URL tải Artifacts tạm thời hoặc chữ ký hết hạn. Liên kết Actions dẫn tới workflow; đây vẫn là bản dựng phát triển, chưa phải bản phát hành ổn định.

## Tài nguyên và giấy phép

Ảnh và biểu tượng được lấy từ repo `fx-kitsune/mykos`, bộ thiết kế M1 tại commit `41c12d9`. Ảnh là bản mẫu trình duyệt, không phải ảnh xác nhận KDE chạy trên ISO. Logo Fold và biểu tượng được giữ theo nguồn gốc dự án.

Mã nguồn trang dùng giấy phép MIT; xem [LICENSE](LICENSE). Thương hiệu Ubuntu, KDE và các thành phần liên quan thuộc chủ sở hữu tương ứng; trang không tuyên bố được các dự án đó bảo trợ.
