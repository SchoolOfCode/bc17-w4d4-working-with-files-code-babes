import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

const fileName = "quotes.json";

async function getQuotes() {
  try {
    const data = await fs.readFile(fileName, 'utf8');
    console.log("File content:", data);  // Debug statement
    const quotes = JSON.parse(data);
    console.log("Parsed quotes:", quotes);  // Debug statement.
    return quotes;
  } catch (error) {
    console.error("Error reading the quotes file:", error);
    return [];
  }
}

async function addQuote(quoteText) {
  try {
    const data = await fs.readFile(fileName, 'utf8');
    const quotes = JSON.parse(data);

    const newQuote = {
      id: uuidv4(),
      quoteText: quoteText
    };

    quotes.push(newQuote);
    console.log("Updated quotes:", quotes);  // Debug statement

    await fs.writeFile(fileName, JSON.stringify(quotes, null, 2));
    console.log("New file content:", JSON.stringify(quotes, null, 2));  // Debug statement

    return newQuote;
  } catch (error) {
    console.error("Error adding a new quote:", error);
    return null;
  }
}

