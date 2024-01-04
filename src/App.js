import { useState } from "react";
import Home from "./Components/Home";
import { app } from "./Configs/Firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import Login from "./Components/Login";

const auth = getAuth(app);

function App() {

  const [user, setUser] = useState("");

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
      {user && <Home logOut={signOutUser} user={user}/>}
      {!user && <Login logIn={singInUser} />}
    </div>
  );
}

export default App;

