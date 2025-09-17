/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DetailsContext } from "../UseDetails";

function Books() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const { setSelectedBook } = useContext(DetailsContext);
  

  useEffect(() => {
    async function getBooks() {
      try {
        const response = await axios.get(
          "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books"
        );
        setBooks(response.data);
        // console.log("API response:", response.data);
      } catch (err) {
        console.error("Axios error: getting books", err);
      }
    }
    getBooks();
  }, []);

  if (!books || books.length === 0) {
    return <div>empty</div>;
  }

  return (
    <main>
      <div className="booksGrid">
        {books.map((book) => {
          return (
            <div
              key={book.id}
              className="bookCard"
              onClick={() => {
                setSelectedBook(book);
                navigate(`/books/${book.id}`);
              }}
            >
              <img
                src={book.coverimage}
                alt={book.title}
                className="bookCover"
              />
              <p>name: {book.title}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default Books;

/*QUESTION/NOTES
- still get confused on what format my error messages should be
or if theres ever a time it needs to be specific. 

*/