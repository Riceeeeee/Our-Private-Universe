import { kv } from '@vercel/kv';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * GET /api/messages
 * Lấy toàn bộ tin nhắn từ kho dữ liệu Redis.
 */
export async function GET() {
  try {
    // Sử dụng lrange để lấy tất cả các phần tử trong danh sách 'messages'
    const messages = await kv.lrange('messages', 0, -1);
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Lỗi khi lấy tin nhắn:', error);
    return new NextResponse('Lỗi Máy chủ Nội bộ', { status: 500 });
  }
}

/**
 * POST /api/messages
 * Thêm một tin nhắn mới vào kho dữ liệu Redis.
 */
export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    // Kiểm tra xem tin nhắn có tồn tại không
    if (!message) {
      return new NextResponse('Nội dung tin nhắn là bắt buộc', { status: 400 });
    }

    // Thêm tin nhắn mới vào cuối danh sách 'messages'
    await kv.rpush('messages', message);

    // Trả về phản hồi thành công
    return new NextResponse('Đã thêm tin nhắn', { status: 201 });
  } catch (error) {
    console.error('Lỗi khi thêm tin nhắn:', error);
    return new NextResponse('Lỗi Máy chủ Nội bộ', { status: 500 });
  }
}
