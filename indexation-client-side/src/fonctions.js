import firebase from './FireStore';

export function soundex(sentence) {
  // get length of word 
  const length = sentence.length

  // get the first part of word
  let firstPart = sentence.substr(0, sentence.length / 2) // Gets the first 
  // get the second part of word
  let secondPart = sentence.substr(sentence.length / 2, sentence.length) // Gets the socond  
  console.log(firstPart)
  console.log(secondPart)
  const letters = {
    a: { poid: 0, sentencePart: "" }, b: { poid: 0, sentencePart: "" }, c: { poid: 0, sentencePart: "" },
    d: { poid: 0, sentencePart: "" }, e: { poid: 0, sentencePart: "" }, f: { poid: 0, sentencePart: "" },
    g: { poid: 0, sentencePart: "" }, h: { poid: 0, sentencePart: "" }, i: { poid: 0, sentencePart: "" },
    j: { poid: 0, sentencePart: "" }, k: { poid: 0, sentencePart: "" }, l: { poid: 0, sentencePart: "" },
    m: { poid: 0, sentencePart: "" }, n: { poid: 0, sentencePart: "" }, o: { poid: 0, sentencePart: "" },
    p: { poid: 0, sentencePart: "" }, q: { poid: 0, sentencePart: "" }, r: { poid: 0, sentencePart: "" },
    s: { poid: 0, sentencePart: "" }, t: { poid: 0, sentencePart: "" }, u: { poid: 0, sentencePart: "" },
    v: { poid: 0, sentencePart: "" }, w: { poid: 0, sentencePart: "" }, x: { poid: 0, sentencePart: "" },
    y: { poid: 0, sentencePart: "" }, z: { poid: 0, sentencePart: "" },
  }
  for (let i = 0; i < firstPart.length; i++) {
    letters[firstPart.charAt(i)] = { poid: 0, sentencePart: "first" }
  }
  for (let i = 0; i < secondPart.length; i++) {
    if (letters[secondPart.charAt(i)] && letters[secondPart.charAt(i)] === "first") {
      letters[secondPart.charAt(i)] = { poid: 0, sentencePart: "firstsecond" }
    } else {
      letters[secondPart.charAt(i)] = { poid: 0, sentencePart: "second" }
    }
  }
  for (let i = 0; i < firstPart.length; i++) {
    letters[firstPart.charAt(i)]["poid"] = letters[firstPart.charAt(i)]["poid"] + 1
  }
  for (let i = 0; i < secondPart.length; i++) {
    letters[secondPart.charAt(i)]["poid"] = letters[secondPart.charAt(i)]["poid"] + 1
  }
  return (letters)
}

export function soundex2(someString) {
  // get length of word 
  const length = someString.length

  // get the first part of word
  let firstPart = someString.substr(0, someString.length / 2) // Gets the first 
  // get the second part of word
  let secondPart = someString.substr(someString.length / 2, someString.length) // Gets the socond

  // get letters of the first part of word
  const letters1 = {}
  for (let i = 0; i < firstPart.length; i++) {
    letters1[firstPart.charAt(i)] = 0
  }
  for (let i = 0; i < firstPart.length; i++) {
    letters1[firstPart.charAt(i)] = letters1[firstPart.charAt(i)] + 1
  }
  // get letters of the second part of word
  const letters2 = {}
  for (let i = 0; i < secondPart.length; i++) {
    letters2[secondPart.charAt(i)] = 0
  }
  for (let i = 0; i < secondPart.length; i++) {
    letters2[secondPart.charAt(i)] = letters2[secondPart.charAt(i)] + 1
  }
  return { letters1: letters1, letters2: letters2, length: length }
}
export function verifyExistenceOfPartInBddWords(obj1, obj2, part) {
  let countLetter = 0
  let countTrueLetter = 0

  for (const letter in obj1) {
    countLetter = countLetter + 1
    if (obj2.letters[letter].poid > 0 && obj2.letters[letter].sentencePart.includes(part)) {
      countTrueLetter = countTrueLetter + 1
    }
  }
  return countLetter - countTrueLetter
}
export function firstApproche(requete) {
  let result = []
  firebase.firestore().collection("WordsWeights").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      let nbrMistakes = verifyExistenceOfPartInBddWords(soundex2(requete).letters1, doc.data(), "first")
        + verifyExistenceOfPartInBddWords(soundex2(requete).letters2, doc.data(), "second")

      if (nbrMistakes <= Math.abs((requete.length - doc.data().word.length) / 2) && requete.length / doc.data().word.length > 0.6 && requete.length / doc.data().word.length < 1.4) {
        result.push(doc.data())
      }
    });
  });
  return result
}
export function secondApproche(sentence) {
  let result = []
  // get the first part of word
  let firstPartR = sentence.substr(0, sentence.length / 2) // Gets the first 
  // get the second part of word
  let secondPartR = sentence.substr(sentence.length / 2, sentence.length) // Gets the socond  
  firebase.firestore().collection("WordsWeights").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // get the first part of word
      let firstPartW = doc.data().word.substr(0, doc.data().word.length / 2) // Gets the first 
      // get the second part of word
      let secondPartW = doc.data().word.substr(doc.data().word.length / 2, doc.data().word.length) // Gets the socond  
      if ((sentence.includes(firstPartW) || sentence.includes(secondPartW) || doc.data().word.includes(firstPartR) || doc.data().word.includes(secondPartR)) && Math.abs(doc.data().word.length - sentence.length) < 3) {
        result.push(doc.data())
      }
    });
  });
  return result
}
export function thirdApproche(sentence){
  // get the first part of word
  let firstPartR = sentence.substr(0, sentence.length / 2) // Gets the first 
  // get the second part of word
  let secondPartR = sentence.substr(sentence.length / 2, sentence.length) // Gets the socond  

  firebase.firestore().collection("WordsWeights").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // get the first part of word
      let firstPartW = doc.data().word.substr(0, doc.data().word.length / 2) // Gets the first 
      // get the second part of word
      let secondPartW = doc.data().word.substr(doc.data().word.length / 2, doc.data().word.length) // Gets the socond  
      //count
      let count=0
      for (let i = 0; i < firstPartR.length; i++) {
        if(firstPartW.includes(firstPartR.charAt(i))){
          count=count+1
        }
      }
      for (let i = 0; i < secondPartR.length; i++) {
        if(secondPartW.includes(secondPartR.charAt(i))){
          count=count+1
        }
      }
      
      if(doc.data().word.length-count<3){
        console.log("data "+doc.data().word.length,"count "+count,"request "+sentence.length)
        console.log(doc.data().word)
      }

    });
  });
}
/*
        /*<img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>*/
