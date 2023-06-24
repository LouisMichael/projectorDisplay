import { useEffect, useState } from 'react';
import db from '../firebase';
import { doc,collection, query, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";

 
function Host() {
  const colletionRef = collection(db, 'host-sessions');
  const [sessions, setSessions] = useState([]);
  const [currentSessionDiv, setCurrentSessionDiv] = useState(<div>Please join or create a session</div>);
  let currentSession = null;
  useEffect(() => {
    const q = query(
      colletionRef
    );
    const unsub = onSnapshot(colletionRef, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setSessions(items);
    });
    return () => {
      unsub();
    };

    // eslint-disable-next-line
  }, []);

  async function createNewSession(){
    let intCode = Math.floor(Math.random() * 16777216);
    let hexCode = intCode.toString(16);
    currentSession = hexCode;
    const newSession = {
      createdAt: serverTimestamp(),
      lastUpdate: serverTimestamp(),
    }
    try {
      const sessionRef = doc(colletionRef, hexCode);
      await setDoc(sessionRef, newSession);
    } catch (error) {
      console.error(error);
    }
    setCurrentSessionDiv(<div>Current Session: {currentSession}</div>);
    console.log("new session: " + currentSession);
  }
  return (
    <div>
      <h1>Host</h1>
      {currentSessionDiv}
      <button onClick={()=>createNewSession()}>New Session</button>
      <form>
        <label for="joinSessionId">Join an Existing Session as a Host:</label>
        <input type="text" id="joinSessionId" name="joinSessionId"/>
        <input type="submit" value="Submit"/>
      </form>
      
    </div>
  );
}

export default Host;
