/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import axios from "axios";

function Account() {
  const { user, getUser, token } = useContext(AuthContext);
   useEffect(() => {
  if (!token) return; // don't fetch when logged out

  const getAccount = async () => {
    try {
      await getUser();
    } catch (e) {
      console.log(e?.message);
    }
  };

  getAccount();
}, []); //took off dependency array because it kept going cray. 

const returnBook = async (bookId) => {
    try{
        await axios.delete('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/'+ bookId, {
           headers:{ 
                "Authorization": `Bearer ${token}` 
            } 
        })
    } catch(err){
        console.log(err)
    }
}
if (!user) {
    return (
        <main>
            <h2>My Account</h2>
            <p>Please log in to view your account details. </p>
        </main>
    );
}

return (
    <main>
        <h2>My Account</h2>
        <h1>{user.firstname} {user.lastname}</h1>
        <p>{user.email}</p>
        {user.reservations.length <=0 ? (
            <p>You do not have any books checked out! Do you even read??</p>
        ) : (
            user.reservations.map(reservation => (
                <div key={reservation.id}>
                    <h4>{reservation.title}</h4>
                    <img src={reservation.coverimage}
                    alt={reservation.title} />
                    <button onClick={() =>
                        returnBook(reservation.id)
                    }>Return Book</button>
                </div>
            ))
        )}
    </main>
);
} 

export default Account;
