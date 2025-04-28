// Author: Yat Long (Louis) Szeto
// Description: API route for retrieving a random quote using the DummyJSON quote API.

import { NextResponse } from 'next/server';

// --- GET /api/quote ---
// Fetch a quote
export async function GET() {
  try {
    // Call external DummyJSON quotes API
    const response = await fetch('https://dummyjson.com/quotes/random');
    const json = await response.json();

    // Simplify and return the quote and author
    return NextResponse.json({
      q: json.quote,
      a: json.author,
    });
  } catch (error) {
    console.error('Failed to fetch daily quote:', error);
    return NextResponse.json({ error: 'Quote fetch failed' }, { status: 500 });
  }
}