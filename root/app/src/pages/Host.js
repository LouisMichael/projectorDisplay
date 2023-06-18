import { useEffect, useState } from 'react';
import db from '../firebase';
import { doc,collection, addDoc, onSnapshot } from "firebase/firestore";

try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
 
function Host() {
  const [sessions, setSessions] = useState([]);
  // try {
  //   const docRef = addDoc(collection(db, "host-sessions"), {
  //     code: '000001'
  //   }).then(()=>{
  //     console.log("Document written with ID: ", docRef.id);
  //   }
  //   );
  // } catch (e) {
  //   console.error("Error adding document: ", e);
  // }
  function getSession() {
    const unsub = onSnapshot(collection(db, "host-sessions"), (docs) => {
      const items = [];
      docs.forEach((doc) => {
        items.push(doc.data());
      });
      console.log(items);
      setSessions(items);
    });
    
  }
  useEffect(() => {
    getSession();
  });
  


  return (
    <div>
      <h1>Host</h1>
      {sessions.map((session) => (
        <h2>{session.code}</h2>
      ))}
    </div>
  );
}

export default Host;
