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

Dữ liệu được lưu trữ trên **Vercel KV** (Redis database), cho phép đồng bộ theo thời gian thực giữa tất cả các thiết bị.

## Deploy lên Vercel và Kết nối KV Database

### Bước 1: Push code lên GitHub
```bash
git add .
git commit -m "Deploy to Vercel"
git push origin main
```

### Bước 2: Deploy lên Vercel

1. Truy cập [https://vercel.com](https://vercel.com) và đăng nhập
2. Click **"Add New..."** → **"Project"**
3. Import repository GitHub của bạn
4. Click **"Deploy"** (không cần thay đổi setting gì)

### Bước 3: Tạo Vercel KV Database

1. Sau khi deploy xong, vào **Dashboard** của project
2. Click tab **"Storage"** ở menu trên
3. Click **"Create Database"**
4. Chọn **"KV"** (Key-Value Store)
5. Đặt tên database (ví dụ: `our-universe-kv`)
6. Chọn region gần bạn nhất
7. Click **"Create"**

### Bước 4: Kết nối KV với Project

1. Sau khi tạo KV xong, click vào database vừa tạo
2. Vào tab **"Settings"** của KV database
3. Kéo xuống phần **"Connect"**
4. Trong dropdown, chọn project của bạn
5. Click **"Connect Project"**
6. Vercel sẽ tự động thêm environment variables cần thiết

### Bước 5: Redeploy

1. Quay lại tab **"Deployments"** của project
2. Click vào deployment mới nhất
3. Click nút **"..."** (3 chấm) bên phải
4. Chọn **"Redeploy"**
5. Đợi deploy xong

🎉 **Hoàn thành!** Web của bạn giờ đã kết nối với Vercel KV. Mọi thay đổi sẽ được lưu và đồng bộ cho tất cả người dùng!

### Kiểm tra

- Mở web trên nhiều thiết bị khác nhau
- Thêm kỷ niệm hoặc mục tiêu ở thiết bị A
- Tải lại trang ở thiết bị B → Dữ liệu sẽ xuất hiện ngay lập tức!
