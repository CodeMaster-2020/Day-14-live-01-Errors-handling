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
