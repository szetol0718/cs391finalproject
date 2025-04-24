// Author: Yat Long (Louis) Szeto
// Description: API route for retrieving a random quote using the DummyJSON quote API.
// This route fetches a quote and returns it in a simplified format with keys `q` (quote) and `a` (author).
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://dummyjson.com/quotes/random');
    const json = await response.json();

    return NextResponse.json({
      q: json.quote,
      a: json.author,
    });
  } catch (error) {
    console.error('Failed to fetch daily quote:', error);
    return NextResponse.json({ error: 'Quote fetch failed' }, { status: 500 });
  }
}