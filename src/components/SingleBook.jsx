/* TODO - add your code to create a functional React component that renders details for a single book when clicked. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
/* info needed:
- ROUTE: /book/:id (:id comes fro mReact Router. SingleBook needs to read id from the URL)
- AXIOS: call that uses id
-STATE: store result in state so React can re-render with the book details
- spinner for loading maybe? :)
-LAYOUT: image, title, author, description, and ~logged in conditional~ "checkout" bttn. (wrap everything in clear container)
    CONDITIONS: 
    if no book found: show error message
    if user is logged in: show checkout bttn. 
*/
import axios from "axios";
import { useContext } from "react";
import { useEffect } from "react";
import { DetailsContext } from "../UseDetails";
import { useParams } from "react-router-dom";
import { AuthContext } from "../AuthContext";

function SingleBook() {
    const {selectedBook, setSelectedBook} = useContext(DetailsContext);
    const {token} = useContext(AuthContext)
    const {id} = useParams();
    
    useEffect(() => {
    async function getBook() {
      try {
        const response = await axios.get(
          `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`
        );
        setSelectedBook(response.data);
        // console.log("API response:", response.data);
      } catch (err) {
        console.error("Axios error: getting book", err);
      }
    }
    getBook();
  }, [id, setSelectedBook]);
//   console.log('id from params:', id);

const reserveBook = async (bookId) => {
  console.log(bookId)
  try{
    const response = await axios.post('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations', {bookId:bookId}, {
              headers:{ 
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}` 
            }
        } )
        console.log(response.data)
  } catch (err) {
    console.log(err)
  }
}

  return (
    !selectedBook ? (
      <p>Seems we do not have this book.</p>
    ) : (
      <>
        <img src={selectedBook.coverimage} alt={selectedBook.title} />
        <h1>{selectedBook.title}</h1>
        <p>{selectedBook.author}</p>
        <p>Available : {selectedBook.available ? "True":"False"}</p>
        <p>{selectedBook.description}</p>
        {token && <button onClick = {() => reserveBook(selectedBook.id)} disabled = {!selectedBook.available}>{selectedBook.available? "Reserve book":"This book is reserved"}</button>}
      </>
    )
  );
}

  export default SingleBook
