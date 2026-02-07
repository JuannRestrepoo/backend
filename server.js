const e = require("express")
const app = require("./app")
const {mongoConnection} = require("./database/configuration")
const dotenv = require("dotenv").config()

const connect = mongoConnection()
app.set('port', process.env.PORT || 3000) 

app.listen(app.get('port'),()=>{
    console.log(`Server on port, ${app.get('port')}`);
    console.log("environment",process.env.NODE_ENV);
    console.log('Endpoint:', `http://localhost:${app.get('port')}`)
})


