import { NextResponse } from 'next/server';
import { getRedisClient } from '@/lib/redis';

export const POST = async () => {
  try {
    const redis = await getRedisClient();

    // Fetch data from Redis
    const result = await redis.get("item");

    // Return the result in the response
    return new NextResponse(JSON.stringify({ result }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal server error' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
