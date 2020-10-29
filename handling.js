class MissingStreetError extends Error {
  constructor(message) {
    super(message);

    this.name = "MissingStreetError";
  }
}

var teacher = {
  name: "Fabrizio",
  surname: "Rizzonelli",
  address: {
    street: "Via Mario",
    n: "12/a",
    print: () => {
      if (teacher.address.street === "Via Mario") {
        throw new MissingStreetError(
          "Questa strada non esiste più, il comune l'ha tolta"
        );
      }

      console.log(teacher.address.street + " " + teacher.address.n);
    }
  }
};

// console.log(teacher);

// delete teacher.address;

// console.log(teacher.address.street);

try {
  teacher.address.print();
} catch (err) {
  console.log(err);
} finally {
  console.log("Stiamo tutti a casa");
}

function division(num1, num2) {
  return num1 / num2;
}

console.log(division(10, 5));
console.log(division(10, 0));

function divisionWithCallback(num1, num2, callback) {
  try {
    const result = num1 / num2;
    // qui come avete fatto tutti, possiamo creare degli errori custom
    // e fare il throw nelle varie condizioni
    // per esempio num2 isNan oppure callback undefined

    callback(result);
  } catch (err) {
    // se abbiamo fatto il throw degli errori all'interno del try sopra
    // qui ci troveremo quegli errori :)
    console.log(err);
  } finally {
    console.log("finally");
  }
}

// division method fatto con le promise
function divisionAsync(term1, term2) {
  return new Promise(function(resolve, reject) {
    if (term1 === undefined || term2 === undefined) {
      return reject(new Error("Missing term, cannot divide"));
    }

    resolve(term1 / term2);
  });
}

function main() {
  const amount = division(10, 5);

  showInThePage(amount);
}

function mainWithCallback() {
  // qui vogliamo eseguire la divisione tra due numeri
  // e poi dividere il risultato ottenuto per un'altro numero
  divisionWithCallback(10, 5, amount => {
    showInThePage(amount);

    // ovviamente qui ci tocca mettere la seconda chiamata asyncrona
    // dentro la callback, capite anche voi che se devo fare 10 divisioni
    // una che sfrutta il risultato della precedente si annidano le callback e
    // diventa molto difficile leggere
    divisionWithCallback(amount, 2, result => {
      showInThePage(result);
    });
  });
}

function mainWithPromises() {
  // Esercizio di prima convertito in promises
  divisionAsync(10, 5)
    .then(amount => {
      // ecco qui il punto di svolta rispetto alle callback
      // ritorniamo la promise per riprendere la catena al livello superiore
      return divisionAsync(amount, 2);

      // tenete conto che potrei anche scrivere
      // return divisionAsync(amount, 2).then(...)
      // ma questo andrebbe a rompere la chain
      // i then devono sempre essere consecutivi e
      // ritornare promises, non altri then
    })
    .then(result => {
      showInThePage(result);
    })
    .catch(err => {
      // qui l'errore può essere legato sia alla prima operazione async
      // che alla seconda, sta a noi nel catch gestirlo in maniera opportuna
      console.log(err);
    });
}

// qui invece la stessa funzione se l'avessimo fatta con async/await
async function mainAsync() {
  // chiamo la prima promise, aspettando il risultato
  const amount = await divisionAsync(10, 5);

  // controllo che result sia un numero
  // dato che potrebbe contenere l'errore dell'operazione anche!
  if (!isNan(amount)) {
    const result = await divisionAsync(amount);

    // anche qui sarebbe opportuno controllare che result sia ok
    // e non sia in errore
    showInThePage(result);
  } else {
    // qui ci troveremo con amount che contiene l'errore
    // e dovremo farci qualcosa
  }
}

function showInThePage(amount) {
  // qui avremo codice per mostrare amount sulla pagina
  console.log(amount);
}

divisionWithCallback(56, 12, result => {
  console.log(result);
});
divisionWithCallback(48, result => {
  console.log(result);
});
divisionWithCallback(89, 34 - (12 + 2) - 10 - (8 - 2), result => {
  console.log(result);
});
