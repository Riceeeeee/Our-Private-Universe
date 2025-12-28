# Our Own Universe - Trang Web Lãng Mạn

Trang web lãng mạn dành cho cặp đôi được xây dựng bằng Next.js và Tailwind CSS.

## Tính năng

- ✨ **Giao diện Glassmorphism**: Hiệu ứng kính mờ đẹp mắt với tông màu hồng pastel
- ❤️ **Trái tim bay**: Hiệu ứng trái tim bay nhẹ nhàng ở nền
- 📅 **Đồng hồ đếm ngược**: Hiển thị số ngày yêu nhau
- 📸 **Kỷ niệm**: Quản lý và xem các kỷ niệm đẹp
- 💌 **Thư bí mật**: Gửi và lưu những lời nhắn yêu thương
- 🌟 **Mục tiêu chung**: Theo dõi những việc muốn làm cùng nhau

## Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Chạy development server:
```bash
npm run dev
```

3. Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt

## Tùy chỉnh

### Thay đổi tên và ngày bắt đầu

Mở file `app/page.tsx` và chỉnh sửa:
- `startDate`: Ngày bắt đầu yêu nhau (format: YYYY-MM-DD)
- `partner1Name` và `partner2Name` trong component Header

### Thêm kỷ niệm mẫu

Chỉnh sửa mảng `sampleMemories` trong `app/page.tsx` hoặc thêm trực tiếp từ giao diện.

### Thêm mục tiêu mẫu

Chỉnh sửa mảng `sampleGoals` trong `app/page.tsx` hoặc thêm trực tiếp từ giao diện.

## Responsive Design

Trang web được thiết kế responsive, hoạt động tốt trên cả điện thoại, tablet và desktop.

## Lưu trữ dữ liệu

Tất cả dữ liệu (kỷ niệm, thư, mục tiêu) được lưu trong Local Storage của trình duyệt.

