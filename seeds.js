const mongoose = require('mongoose')
const Test = require('./app/Models/test')
const User = require('./app/Models/user')

const db = 'mongodb+srv://admin:1234@typingtestcluster.9espqxm.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connection successful')
})
.catch((err) => {
  console.log(err)
})

const seedTests = [
  {
    title: 'Lions',
    body: 'Lions are cute and you should for sure try to pet one if you come across one.'
  },
  {
    title: 'Rules of Baseball',
    body: 'Baseball has no rules. It is a chaos sport.'
  },
  {
    title: 'The seeding worked',
    body: 'Test if it is getting the tests from the API'
  }
]

const seedDB = async () => {
  await Test.deleteMany({})
  await User.deleteMany({})
  await Test.insertMany(seedTests)
}

seedDB().then(() => {
  mongoose.connection.close()
})
.then(() => console.log('closed'))