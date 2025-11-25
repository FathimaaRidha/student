const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid');
const fs=require('fs');
const app = express();

const PORT=process.env.PORT || 3000;
const DATA_FILE='data.json';

app.use(bodyParser.json());
app.use(cors());

//Healper function to read students.json
function readDataFile() {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}
function writeDataFile(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}   
// add a new task
app.post('/api/students', (req, res) => {
    const{name, age, course, year, status } = req.body;
    if(!name || !age || !course || !year || !status) {
        return  res.status(400).json({error: 'All fields are required'});
    }   
    const students = readDataFile();
    const newStudent = {
        id: uuid.v4(),
        name,
        age,
        course,
        year,
        status
    };
    students.push(newStudent);
    writeDataFile(students);
    res.status(201).json(newStudent);
});

// get all students
app.get('/api/students', (req, res) => {
    const students = readDataFile();
    res.json(students);
});     

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
