# Kiểm tra trang giới thiệu

Ngày 08/11/2026.

## Đã kiểm tra

- Cú pháp `app.js`, công cụ build và công cụ kiểm tra.
- Không có ID trùng; các điểm neo nội bộ và tài nguyên CSS/JavaScript/ảnh được tham chiếu tồn tại.
- Ảnh có thuộc tính mô tả, chiều rộng và chiều cao; liên kết mở tab mới có `noopener`.
- Menu thu gọn: mở/đóng, chọn liên kết và Escape cập nhật trạng thái tiếp cận.
- Tab giao diện: chọn mục, phím mũi tên và Home cập nhật ảnh, mô tả, tiêu điểm và nhãn panel.
- Các kiểm tra tương tác trên được thực hiện qua DOM giả lập trong Node.js, chưa xác nhận sự kiện/bố cục trong trình duyệt thật.
- Tạo `dist/` thành công, nội dung giống nguồn; không triển khai hosting.
- Đường dẫn tài nguyên tương đối, không buộc trang chạy ở gốc tên miền.
- Nội dung phân biệt ảnh thiết kế với ISO phát triển; không công bố bản ổn định hoặc tương thích Windows chưa kiểm chứng.

## Giới hạn kiểm tra trực quan

Đã thử khởi động preview được hỗ trợ bằng `sites-preview start /workspace/mykos-static-web`. Hạ tầng trả lỗi `relay could not open browser port 4173: timed out waiting for relay readiness`; trạng thái sau đó là `Sites preview stopped`.

Do chưa có đường xem trước hoạt động, **chưa kiểm chứng hiển thị desktop/mobile hoặc thao tác bằng trình duyệt thật trong lần này**. CSS đã có bố cục đáp ứng và giảm chuyển động, nhưng không xem đó là kết quả kiểm thử trực quan. Cần rà soát lại khi hạ tầng preview hoặc máy chạy trình duyệt cục bộ sẵn sàng.

## Chưa thực hiện

Công khai repo, GitHub Pages, triển khai dịch vụ khác, cấu hình tên miền, kiểm tra SEO trên tên miền thật, trình đọc màn hình hoặc đo hiệu năng trong điều kiện mạng thực tế.
