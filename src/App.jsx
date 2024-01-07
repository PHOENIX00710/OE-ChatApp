import { useState, useEffect } from "react";
import Home from "./Components/Home";
import { app } from "./Configs/Firebase";
import Login from "./Components/Login";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { addDoc, collection, doc, getFirestore, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';

const db = getFirestore(app);
const auth = getAuth(app);

function App() {

  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const updateMessage = (val) => {
    setMessage(val);
  }

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const docref = await addDoc(collection(db, "messages"), {
        userID: user.uid,
        userURI: user.photoURL,
        message: message,
        createdAt: serverTimestamp(),
      })
      console.log("Added");
      setMessage("");
    }
    catch (e) { console.log(e) }
  }

  useEffect(() => {
    const q=query(collection(db,"messages"),orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (user) {
        const temp = snapshot.docs.map((doc) => {
          return (
            {
              messageID: doc.id,
              ...doc.data(),  // I have to call the function with paranthesis that's and not doc.data;
            }
          )
        })
        console.log(temp);
        setMessages(temp);
      }
    })
  }, [user])


  const singInUser = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser(user);
      }).catch((error) => {
        console.log("Error in Logging in User");
      });
  }

  const signOutUser = () => {
    signOut(auth).then(() => {
      setUser("");
      console.log(user);
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="App">
      {user && <Home logOut={signOutUser} addMessage={sendMessage} message={message} messages={messages} updateMessage={updateMessage} currUser={user}/>}
      {!user && <Login logIn={singInUser} />}
    </div>
  );
}

export default App;

