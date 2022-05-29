const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const db = require('./app/models')
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Database connected!')
    })
    .catch(error => {
        console.log("Can't connect to the database!", error)
        process.exit()
    }) 

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    })
})

require('./app/routes/user.routes')(app)

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})