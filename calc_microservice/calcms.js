const express = require("express");
const res = require("express/lib/response");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const StudentModel = require("./studentSchema");
const winston = require("winston");
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "calculate-service" },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

const uri = 'mongodb://admin:password@localhost:32000/?directConnection=true&authMechanism=DEFAULT'

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

connect();
app.use(bodyParser.json());

//Arithmetic Functions
const add = (n1, n2) => {
  return n1 + n2;
};

const subtract = (n1, n2) => {
  return n1 - n2;
};

const multiply = (n1, n2) => {
  return n1 * n2;
};

const divide = (n1, n2) => {
  return n1 / n2;
};

//Addition
app.post("/add", (req, res) => {
  try {
    const n1 = parseFloat(req.body.n1);
    const n2 = parseFloat(req.body.n2);
    if (isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
    }
    if (isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 incorrectly defined");
    }
    if (n1 === NaN || n2 === NaN) {
      console.log();
      throw new Error("Parsing Error");
    }
    logger.info("Parameters " + n1 + " and " + n2 + " received for addition");
    const result = add(n1, n2);
    res.status(200).json({ statuscocde: 200, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statuscocde: 500, msg: error.toString() });
  }
});

//Subtraction
app.get("/subtract", (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
    }
    if (isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 incorrectly defined");
    }
    if (n1 === NaN || n2 === NaN) {
      console.log();
      throw new Error("Parsing Error");
    }
    logger.info(
      "Parameters " + n1 + " and " + n2 + " received for subtraction"
    );
    const result = subtract(n1, n2);
    res.status(200).json({ statuscocde: 200, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statuscocde: 500, msg: error.toString() });
  }
});

//Multiplication
app.get("/multiply", (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
    }
    if (isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 incorrectly defined");
    }
    if (n1 === NaN || n2 === NaN) {
      console.log();
      throw new Error("Parsing Error");
    }
    logger.info(
      "Parameters " + n1 + " and " + n2 + " received for multiplication"
    );
    const result = multiply(n1, n2);
    res.status(200).json({ statuscocde: 200, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statuscocde: 500, msg: error.toString() });
  }
});

//Division
app.get("/divide", (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
    }
    if (isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 incorrectly defined");
    }
    if (n1 === NaN || n2 === NaN) {
      console.log();
      throw new Error("Parsing Error");
    }
    logger.info("Parameters " + n1 + " and " + n2 + " received for division");
    const result = divide(n1, n2);
    res.status(200).json({ statuscocde: 200, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statuscocde: 500, msg: error.toString() });
  }
});



app.get("/insert", (req, res) => {
  const newStudent = new StudentModel({
    StudentId: 11,
    Name: "Alton Liew", 
    Roll: 11, 
    Birthday: 1999 - 09 - 11,
    Address: "123 Blenheim Street"
  });

  let output;

  async function save() {
    output = await newStudent.save();
  }
  save();
  res.status(200).send({
    status: 'Success',
    msg: 'Data is saved within the database!'
  })
});

async function getStudents() {
  const Student = await StudentModel.find({});
  return Student;
}

app.get("/find", async (req, res) => {
  const allStudents = await StudentModel.find()
  res.status(200).send({
    status: 'Success',
    data: allStudents
  });
})

app.post("/update", async (req, res) => {
  let name = req.query.name;
  await StudentModel.findOneAndUpdate({ Name: 'Alton Liew'}, { Name: name })
  res.status(200).send({
    status: 'Success',
    msg: 'Record has been updated!'
  })
})

app.get("/delete", async (req, res) => {
  await StudentModel.findOneAndDelete({ Name: 'Ryan' })
  res.status(200).send({
    status: 'Success',
    msg: 'Record has been deleted!'
  })
})

const port = 3001;
app.listen(port, () => {
  console.log("Listening to port " + port);
});
