// Database collection: 
// —> Collection of songs and vibes 
// —> Collection of journal entries 

// GET REQUEST:
// Getting all vibes

// GET REQUEST:
// Getting specific journal 

// GET REQUEST:
// Getting all journals

// POST REQUEST:
// Posting journal entry composed of song, vibe, journal entry

// POST REQUEST:
// Updating vibe of a journal entry


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
	const vibeCategory = req.params.vibe.toLowerCase(); //.villager from line 46

	//construct query

	//const query = {};
	//query["_id"] = villagerName;
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

	const newArtist = req.body.artist;
	const newVibe = req.body.vibe;
	const newDate = req.body.date;

	const result = await collection.insertOne({
		"artist" : newArtist,
		"vibe" : newVibe,
		"date" : newDate
	});


}
app.post("/addjournal", jsonParser, addNewJournal);

app.listen(5000, function(){
	console.log("Server is running on port 5000.");
})


// async function getAllJournals(req, res) {

// 	const query = {_id:1};
// 	let journalsCursor = await collection.find(query);
// 	let journals = await journalsCursor.toArray();

// 	const response = journals;

// 	console.log(response);

// 	if(journals.size() === 0) {
// 		res.json("No response")
// 	}

// 	res.json(response);


// 	console.log("in get all journals");
// }
// app.get('/journal-entries', getAllJournals);

// getAllJournals();



// async function getJournalByName(req, res) {
// 	const journalDate = req.params.date;



// }
// app.get('/journal-entries/:journal-entry', getAllJournals);

// async function getVibes(req, res) {

// }
// app.get('/vibes', getVibes);


// async function newJournal(req, res) {

// 	const journal = req.params.journal;

// 	const date = req.body.date;
// 	const entry = req.body.entry;
// 	const vibe = req.body.vibe;
// 	const song = req.body.song;
// 	const artist = req.body.artist;

// 	const result = await collection.insertOne({
// 		"_id" : new Date(date),
// 		"date": new Date(date),
// 		"vibe": vibe,
// 		"entry": entry,
// 		"song": song,
// 		"artist": artist
// 	})

// }

// app.post("/journal_entries/:journal", jsonParser, newJournal)






// async function updateVillagerRating(req, res) {

// 	//grab the villager info 
// 	const villagerName = req.params.villager;
// 	//grab the new rating that is being sent through body
// 	const newRating = req.body.rating;

// 	//construct query
// 	const filter = {_id:villagerName.toLowerCase()};
// 	const updateDocument  = {
// 		$set: {
// 			rating: newRating 
// 		}


// 	};
// 	//console.log(filter);

// 	//{rating: 1} in body in Postman

// 	const result = await collection.updateOne(filter, updateDocument);

// 	//send back http request code
// 	//matched count, modified count 
// 	//ex. construct a json object that contains both to the client, to know what is updated

// 	const response = [
// 		{matchedCount : result.matchedCount},
// 		{modifiedCount : result.modifiedCount}

// 	];

// 	res.json(response);
// }





// app.post("/updaterating/:villager", jsonParser, updateVillagerRating)

// client.connect().then(result=> {
// 	console.log(result)
// }, error => {
// 	console.log(error);
// })




// const app = express();
// const jsonParser = bodyParser.json();
// app.use(cors());

// let database = null;
// let collection = null;


// async function connectDB() {
// 	await client.connect();
// 	const database = client.db("vibes-database");
// 	const collection = database.collection("journal-entries");

// }

// connectDB();




//   /* Load the HTTP library */
// app.listen(5000, function() {
// 	console.log("Server is running on port 5000.")
// })