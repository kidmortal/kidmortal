import FireBase from "firebase";

import firebaseConfig from "./firebaseConfig";

FireBase.initializeApp(firebaseConfig);
FireBase.analytics();

export default FireBase;
