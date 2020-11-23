
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://jasminedelrey:vibes2020@vibecluster0.kytx6.mongodb.net/vibes-database?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useUnifiedTopology: true });

const app = express();
const jsonParser = bodyParser.json();
app.use(cors());

let database = null;
let collection = null;

