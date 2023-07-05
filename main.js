const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Patient = require("./models/patient");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

mongoose.connect("mongodb+srv://amirmoghal2610:sK0Xjyu98LiUwFhz@medicaldatabase.bnxc3ea.mongodb.net/patients", { useNewUrlParser: true, useUnifiedTopology: true });


app.get("/", (req, res) => {
    res.render("index");
});

app.get("/addPatient", (req, res) => {
    res.render("addPatient");
});

app.post("/create", (req, res) => {
    const patient = new Patient({
        _id: mongoose.Types.ObjectId(),
        age: req.body.age,
        gender: req.body.gender,
        height: req.body.height,
        weight: req.body.weight,
        cholesterol: req.body.cholesterol
    });
    patient.save()
        .then(() => {
            res.redirect("/");
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

app.get("/show", (req, res) => {
    Patient.find()
        .then(Patient => {
            res.render("show", { Patients: Patient });
        })
        .catch(err => {
            res.status(500).send(err);
        });
});


app.get("/update/:_id", (req, res) => {
    Patient.findById(req.params._id)
    .then(Patient => {
    res.render("update", { Patient });
    })
    .catch(err => {
    res.status(500).send(err);
    });
    });
    
    app.post("/update/:_id", async (req, res) => {
    try {
    let patient = await Patient.findByIdAndUpdate(req.params._id, req.body, {
    new: true
    });
    if (patient) {
    return res.redirect("/show");
    } else {
    return res.status(404).send("Patient not found");
    }
    } catch (err) {
    return res.status(500).send(err);
    }
    });



        app.post("/delete/:_id", async (req, res) => {
            try{
            let patient = await Patient.findByIdAndDelete(req.params._id);
            if(patient){
            return res.redirect("/show");
            }else{
            return res.status(404).send("Patient not found");
            }
            }catch(err){
            return res.status(500).send(err);
            }
            });
            
            app.listen(3000, () => {
            console.log("Server is running on port 3000");
            });
            
            
        
