require('dotenv').config({ path: "../.env" });
const mongo_uri = process.env.MONGODB_URI;
const mongoose = require('mongoose')
const Character = require("../models/character.model")



mongoose.connect(mongo_uri)
    .then(() => console.log("connected to mongo"))
    .then(() => {
        return Character.deleteMany();
    })
    .then(() => {
        getCharactersAndInsertThem();
    })
    .catch((error) => console.log(error));


function getCharactersAndInsertThem() {
    fetch("https://rickandmortyapi.com/api/character")
        .then((data) => data.json())
        .then((jsonData) => {
            //we need to "clean" de data
            const cleanedArray = [];
            //the array of characters is in jsonData.results
            jsonData.results.forEach(element => {
                //console.log(element.name)
                //console.log(element.image)
                const name = element.name;
                const imageUrl = element.image;
                cleanedArray.push({ name, imageUrl })
                //console.log(cleanedArray)
            });
            return cleanedArray;
        })
        .then((cleanedArray) => {
            //console.log(cleanedArray);
            //now connect to the DB
            return Character.insertMany(cleanedArray)
        })
        .then(() => console.log("data inserted"))
        .catch((error) => console.log(error))
        .finally(() => mongoose.connection.close())
}