// Author: Yat Long (Louis) Szeto
// Fetch a consistent "Quote of the Day" based on a given date
"use server";

export default async function getQuote(dateString: string) {
  try {
    const date = new Date(dateString);
    const daySeed = date.getDate() + date.getMonth() * 30;

    const quoteId = (daySeed % 365) + 1; 

    const response = await fetch(`https://dummyjson.com/quotes/${quoteId}`);

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
      q: "No quote available.",
      a: "Unknown",
    };
  }
}