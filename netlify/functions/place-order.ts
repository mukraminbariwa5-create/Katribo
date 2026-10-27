// Netlify Function (v2): POST /api/place-order
import { handleOrder } from '../../shared/order';

export default async (req: Request) => {
  const { status, data } = handleOrder(req.method, await req.text());
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'X-Content-Type-Options': 'nosniff' },
  });
};

export const config = { path: '/api/place-order' };
