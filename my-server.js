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

async function getAllJournalsByUser(req, res) {
	const userInfo = req.params.user_email
	const query = {user_email:userInfo}

	let journalsCursor = await collection.find(query);
	let journals = await journalsCursor.toArray();
	const response = journals;
	res.json(response);
	console.log("in get all journals");
}
app.get('/journal-entries/:user_email', getAllJournalsByUser)


//localhost:5000/journal-entries/:vibe
//localhost:5000/journal-entries/sad
async function getJournalByUserAndVibe(req,res) {
	const vibeCategory = req.params.vibe.toLowerCase(); 
	const userInfo = req.params.user_email;


	const query = {vibe:vibeCategory,
				   user_email:userInfo};
	let journalsCursor = await collection.find(query);
	let journals = await journalsCursor.toArray();

	const response = journals;
	res.json(response);
}
app.get('/journal-entries/:user_email/:vibe', getJournalByUserAndVibe)

async function getJournalById(req,res) {
	const idInput = req.params.id;
	const query = {};
	query["_id"] = idInput;

	let journalsCursor = await collection.find(query);
	let journals = await journalsCursor.toArray();

	const response = journals;
	res.json(response);

}
app.get('/search-journal-entries/:id', getJournalById)



async function addNewJournal(req, res) {

	const newId = req.body._id;
	const newArtist = req.body.artist;
	const newVibe = req.body.vibe;
	const newDate = req.body.date;
	const newEntry = req.body.entry;
	const newSong = req.body.song;
	const userEmail = req.body.user_email;

	const result = await collection.insertOne({
		"_id" : newId,
		"user_email": userEmail,
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

// async function addNewUser(req, res) {

// 	const newUser = req.body.email;

// 	const result = await collection.insertOne({

// 		"userEmail" : newUser,

// 	});

// 	const response = result;
// 	res.json(response);


// }
// app.post("/addNewUser", jsonParser, addNewJournal);


app.listen(5000, function(){
	console.log("Server is running on port 5000.");
})

