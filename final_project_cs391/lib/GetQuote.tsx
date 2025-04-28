// Author: Yat Long (Louis) Szeto
// Fetch a random quote of the day
"use server";

export default async function getQuote() {
  try {
    const response = await fetch('https://dummyjson.com/quotes/random');

    if (!response.ok) {
      throw new Error('Failed to fetch quote');
    }

    const json = await response.json();

    return {
      q: json.quote,
      a: json.author,
    };
  } catch (error) {
    console.error('Failed to fetch daily quote:', error);
    return {
      quote: "No quote available.",
      author: "Unknown",
    };
  }
}