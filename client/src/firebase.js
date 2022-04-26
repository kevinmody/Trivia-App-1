import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc, query, where, orderBy, limit } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAS5aE2dUKtg7ZwbNJOGrjTWXjgeQKN3EA",
    authDomain: "trivia-app-3b605.firebaseapp.com",
    databaseURL: "https://trivia-app-3b605-default-rtdb.firebaseio.com",
    projectId: "trivia-app-3b605",
    storageBucket: "trivia-app-3b605.appspot.com",
    messagingSenderId: "814900564757",
    appId: "1:814900564757:web:20de8dd9e7b0b4b5914f1c",
    measurementId: "G-QQJZJ3FRVF",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

function register(displayName, email, password) {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
            console.log("registered")
            localStorage.setItem("user", userCred.user.uid);
            addData("Users", { displayName: displayName, uid: userCred.user.uid })
            updateProfile(userCred.user, { displayName: displayName })
                .then(() => {
                    console.log("display name added")
                    sendEmailVerification(userCred.user)
                        .then(() => {
                            auth.signOut()
                            alert("email verification link sent")
                        })
                })
        })
        .catch((error) => {
            throw error.message;
        })
}

function login(email, password) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
            if (userCred.user.emailVerified) {
                console.log("signed in")
                localStorage.setItem("user", userCred.user.uid)
            } else {
                auth.signOut();
                throw new Error("verify email before logging in")
            }
        })
        .catch((error) => {
            throw error.message;
        })
}

function logout() {
    const auth = getAuth();
    auth.signOut()
        .then(() => {
            localStorage.removeItem("user");
            console.log("logged out");
        })
        .catch((error) => {
            throw error.message;
        })
}

function addData(collectionName, data) {
    addDoc(collection(db, collectionName), data)
        .then((docRef) => {
            console.log("document written: " + docRef.id)
        })
        .catch((e) => {
            console.error("error adding doc: " + e)
        })
}

async function getLeaderboardData(filters = { date: "desc", limit: 10 }) {
    let constraints = []

    for (const filter in filters) {
        if (filter === "uid") {
            constraints.push(where("uid", "==", filters[filter]))
        } else if (filter === "limit") {
            constraints.push(limit(filters[filter]))
        } else {
            constraints.push(orderBy(filter, filters[filter]))
        }
    }

    const docsRef = await getDocs(query(collection(db, "Scores"), ...constraints))

    let docArr = [];

    docsRef.forEach((doc) => {
        let data = doc.data()
        data["id"] = doc.id
        docArr = [...docArr, data]
    })

    let dataArr = [];

    for (const doc of docArr) {
        doc["user"] = await getDisplayName(doc.uid)
        dataArr.push(doc)
    }

    return dataArr
}

async function getDisplayName(uid) {
    let name;

    await getDocs(query(collection(db, "Users"), where("uid", "==", uid)))
        .then((docsRef) => {
            let nameDoc = docsRef.docs[0]
            if (nameDoc) {
                name = nameDoc.data().displayName
            } else {
                name = "Anonymous"
            }
        })

    return name
}

async function getUserScore(uid) {
    let userData = [];

    getLeaderboardData()
        .then((data) => {
            let length;
            length = data.length;

            for (let i = 0; i < length; i++) {
                if (data[i].uid === uid) {
                    userData.push(data[i]);
                };
            }
        })
    return userData;
}

function setNewDisplayName(newName, uid) {
    console.log("In Progress!");
}

export {
    addData,
    getDisplayName,
    getUserScore,
    setNewDisplayName,
    getLeaderboardData,
    register,
    login,
    logout,
    db,
    auth
}
