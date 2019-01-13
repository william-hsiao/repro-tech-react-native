import { Constants } from 'expo';
import * as firebase from 'firebase';
import 'firebase/firestore';

class Firebase {
  constructor(config = {}) {
    firebase.initializeApp(config);
    this.firestore = firebase.firestore();
    this.firestore.settings({ timestampsInSnapshots: true });
  }

  async getItems() {
    return this.firestore.collection('items')
      .orderBy('createdAt', 'asc')
      .get();
  }

  addItem = async (content) => {
    return this.firestore.collection('items').add({
      content,
      createdAt: new Date(),
    }).then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    }).catch((error) => {
      console.error('Error adding document: ', error);
    });
  }

  complteItem = async (item) => {
    this.firestore.collection('items').doc(item.itemId).delete()
      .then(() => {
        console.log('Document successfully deleted!');
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  }
}

// app.jsonから設定の読み込み
const fire = new Firebase(Constants.manifest.extra.firebase);
export default fire;
