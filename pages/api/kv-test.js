import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await kv.set("test-key", "Hello Vercel KV from API!");
      const value = await kv.get("test-key");
      return res.status(200).json({ message: "Vercel KV test successful!", value });
    } catch (error) {
      console.error("Vercel KV test failed:", error);
      return res.status(500).json({ message: "Vercel KV test failed", error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

