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