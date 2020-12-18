import FireBase from "./firebase/firebase";

export const isAuthenticated = async () => await FireBase.auth().currentUser;
