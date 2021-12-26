import {
  doc,
  getDocs,
  getFirestore,
  collection,
} from 'firebase/firestore';
import {LoginManager} from "firebase-login-manager";

const DOCUMENTS_COLL = 'documents';
const SPREADSHEETS_COLL = 'spreadsheets';

export default class DatabaseClient {
  constructor() {
    this.loginManager = new LoginManager(false, null);
  }

  destruct() {
    this.loginManager.destruct();
  }

  async readUserSpreadsheet(name) {
    const user = await this.loginManager.awaitUser();
    const uid = user.uid;

    const db = getFirestore();
    const spreadsheetDocRef = doc(db, `${DOCUMENTS_COLL}/${uid}/${SPREADSHEETS_COLL}`, name);
    const collRef = collection(spreadsheetDocRef, name);
    const querySnapshot = await getDocs(collRef);
    const ids = [];
    const items = [];
    querySnapshot.forEach((doc) => {
      ids.push(doc.id);
      items.push(doc.data());
    });
    return [ids, items];
  }

  async readAllUserSpreadsheetNames() {
    const user = await this.loginManager.awaitUser();
    const uid = user.uid;

    const db = getFirestore();
    const userDocRef = doc(db, DOCUMENTS_COLL, uid);
    const spreadsheetsCollRef = collection(userDocRef, SPREADSHEETS_COLL);
    const querySnapshot = await getDocs(spreadsheetsCollRef);
    const names = [];
    querySnapshot.forEach((doc) => {
      names.push(doc.id);
    });
    return names;
  }
}
