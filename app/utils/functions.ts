import { SearchQuery } from "@/types";
import { UNRELATED_ANSWER } from "./constants";

/**
 * The `fetchAnswer` function is an asynchronous function that sends a POST request to the `/api/answer` endpoint with the
 * `query` and `lang` parameters as the request body. It then reads the response body as a stream and updates the answer
 * using the `onAnswerUpdate` callback function. It also calls the `onSearch` callback function to provide information
 * about the search query, and the `onDone` callback function to indicate that the process is done. If an error occurs, it
 * updates the answer with the `UNRELATED_ANSWER` constant.
 * 
 * @async
 * @function
 * @name fetchAnswer
 * @kind variable
 * @param {string} query
 * @param {(answer: string) => void} onAnswerUpdate
 * @param {(searchQuery: SearchQuery) => void} onSearch
 * @param {(done: boolean) => void} onDone
 * @param {string} lang
 * @returns {Promise<void>}
 * @exports
 */
export const fetchAnswer = async (query: string, onAnswerUpdate: (answer: string) => void, onSearch: (searchQuery: SearchQuery) => void, onDone: (done: boolean) => void, lang: string) => {
  // todo
  try {
    const response = await fetch("/api/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, lang }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    let { answer, source }: {answer: string, source: string} = await response.json();
    // validate
    // call this here to ensure query is shown before answer
    onSearch({ query, sourceLinks: [source], sourceHeadings: [] });
    onAnswerUpdate(answer);
    onDone(true);
  } catch (error: any) {
    onAnswerUpdate(UNRELATED_ANSWER);
    onSearch({ query: error.message ?? 'Error', sourceLinks: [], sourceHeadings: [] });
  }
};
