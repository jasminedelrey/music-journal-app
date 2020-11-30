// Database collection: 
// —> Collection of journal entries 

// GET REQUEST:
// Getting all vibes

// GET REQUEST:
// Getting specific journal 

// GET REQUEST:
// Getting all journals

// POST REQUEST:
// Posting journal entry composed of song, vibe, journal entry



const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://jasminedelrey:vibes2020@vibecluster0.kytx6.mongodb.net/vibes-database?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useUnifiedTopology: true });

const app = express();
const jsonParser = bodyParser.json();
app.use(cors());

let database = null;
let collection = null;


// async function addNewCollection(req, res) {
// 	await client.connect();

// 	const collection_name = req.body.collection_name
// 	collection = collection_name
	
// 	database = client.db("vibes-database");
// 	collection = database.collection(collection);
// 	console.log("In connectDB")


// }
// app.post("/addNewCollection", jsonParser, addNewCollection);

async function connectDB() {
	await client.connect();
	database = client.db("vibes-database");
	collection = database.collection("journal-entries");
	console.log("In connectDB")
}

connectDB();

async function getAllJournals(req, res) {
	let journalsCursor = await collection.find();
	let journals = await journalsCursor.toArray();
	const response = journals;
	res.json(response);
	console.log("in get all journals");
}
app.get('/journal-entries', getAllJournals)


//localhost:5000/journal-entries/:vibe
//localhost:5000/journal-entries/sad
async function getJournalByVibe(req,res) {
	const vibeCategory = req.params.vibe.toLowerCase(); 


	const query = {vibe:vibeCategory};
	let journalsCursor = await collection.find(query);
	let journals = await journalsCursor.toArray();

	const response = journals;
	res.json(response);
}
app.get('/journal-entries/:vibe', getJournalByVibe)

async function getJournalByDate(req,res) {
	const dateInput = req.params.date;
	const query = {};
	query["date"] = dateInput;

	let journalsCursor = await collection.find(query);
	let journals = await journalsCursor.toArray();

	const response = journals;
	res.json(response);

}
app.get('/search-journal-entries/:date', getJournalByDate)



async function addNewJournal(req, res) {

	const newId = req.body._id;
	const newArtist = req.body.artist;
	const newVibe = req.body.vibe;
	const newDate = req.body.date;
	const newEntry = req.body.entry;
	const newSong = req.body.song;

	const result = await collection.insertOne({
		"_id" : newId,
		"artist" : newArtist,
		"vibe" : newVibe,
		"date" : newDate,
		"entry" : newEntry,
		"song" : newSong

	});

	const response = result;
	res.json(response);


}
app.post("/addNewJournal", jsonParser, addNewJournal);


app.listen(5000, function(){
	console.log("Server is running on port 5000.");
})

