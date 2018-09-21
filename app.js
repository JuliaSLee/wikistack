const express = require('express')
const morgan = require('morgan')
const { db } = require("./models");
const models = require("./models")
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');


const app = express();
const bodyParser = require("body-parser")
const PORT = 3000;

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/wiki', wikiRouter);
app.use('/user', userRouter);


app.get('/', (req, res, next) => {
    res.redirect('/wiki');
})

db.authenticate().
then(() => {
    console.log('connected to the database');
})

const init = async () => {
    await models.db.sync({force: true})
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}!`);
    });
}

init()




