const express=require("express")
const mongoose=require("mongoose")

const cors=require("cors")
const bodyParser=require("body-parser")

const app = express();

app.use(express.json());
app.use(bodyParser.json())
app.use(cors());

var connectDb=()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/event_management').then((res)=>{
        console.log('Database connected')
    }).catch((err)=>{
        console.log(err)
    })
}

app.use('/api/events', require('./Routes/events'));
app.use('/api/users', require('./Routes/user'));

app.listen(5000, () => {
  console.log(`port running on 5000`);
  connectDb();
});

