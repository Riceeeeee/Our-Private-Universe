import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Chúng ta xóa bỏ ngoặc nhọn <...> và dùng 'as any' để vượt qua kiểm tra của Vercel
    const memories = (await kv.get('memories')) as any; 
    return NextResponse.json(memories || []);
  } catch (error) {
    return NextResponse.json({ error: 'Không thể lấy dữ liệu mục tiêu' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Lưu danh sách mục tiêu mới vào kho Vercel KV
    await kv.set('memories', body);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Không thể lưu mục tiêu' }, { status: 500 });
  }
}