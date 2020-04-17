const express = require('express')
// const bodyParser= require('body-parser');
const app =express();
const bcrypt = require('bcrypt-nodejs')
// app.use(bodyParser.json());
const cors = require('cors')
const knex = require('knex')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')




app.use(express.json());
app.use(cors())

//knex.js => npm allow to connect to database
// npm install pg => we use postgres


const db = knex({
            client: 'pg',
            connection: {
            host : '127.0.0.1', //localhost
            user : 'postgres',
            password : 'test',
            database : 'smart-brain'
            }
});


app.get('/', (req,res)=> {res.send(db.users)})

// app.post('/signin', (req,res)=> {signin.handleSignin(req,res,db,bcrypt)})
app.post('/signin', signin.handleSignin(db,bcrypt))


	// res.json('signin') //receive json string
	// if(req.body.email === database.users[0].email&& 
	// 	req.body.password === database.users[0].password){
	// 	res.json(database.users[0]);
	// }
	// else{
	// 	res.status(400).json('fail')
	// }

	// db.select('email', 'hash').from('login')
	// 	.where('email', '=', req.body.email)
	// 	.then(data =>{
	// 		const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
	// 		if (isValid){
	// 			return db.select('*').from('users')
	// 			.where('email', '=', req.body.email)
	// 			.then(user=>{
	// 				res.json(user[0])
	// 			})
	// 			.catch(err=> res.status(400).json('unable to search'))
				
	// 		}else{
	// 			res.status(400).json('wrong something')
	// 		}
			
	// 	}).catch(err=> res.status(400).json('wrong credentials'))






// app.post('/register', (req,res)=>{
// 	const {email,name,password} = req.body;
// 	const hash = bcrypt.hashSync(password);
// 	db.transaction(trx => { //transaction for do more than 2 table in database
// 		trx.insert({
// 			hash: hash,
// 			email: email
// 		})
// 		.into('login')
// 		.returning('email')
// 		.then(loginEmail=>{
// 			return trx('users')
// 	.returning('*')
// 	.insert({
// 		email: loginEmail[0],
// 		name:name,
// 		joined: new Date()
// 	}).then(user =>{
// 		res.json(user[0]);
// 	})
// 	})
// 	.then(trx.commit)
// 	.catch(trx.rollback)
// 	})
// 	.catch(err=> res.status(400).json('unable to register'))

// })
app.post('/register',(req,res)=> { register.handleRegister(req,res,db,bcrypt) }) //dependency injecton

app.get('/profile/:id', (req,res)=>{profile.handleProfileGet(req,res,db)})
// app.get('/profile/:id', (req,res)=>{
// 	const { id } = req.params; 
// 	// it's just the name of a property, like "added" or "value" or "type" => look at postman
// 	// there are params, body that we can get information
// 	// let found = false;
// 	// database.users.forEach(user =>{
// 	// 	if(user.id === id){
// 	// 		found = true;
// 	// 		return res.json(user);
// 	// 	}
// 	// })
// 	db.select('*').from('users').where({id}).then(user=>{
// 		if(user.length){
// 			res.json(user[0])
// 		}
// 		else{
// 			res.status(400).json('Not found')
// 		}
		
// 	})
// 	.catch(err => res.status(400).json('error getting user'))
// 	// if(!found){
// 	// 	res.status(404).json('fail')
// 	// }


// })

app.put('/image', (req,res)=>{image.handleImage(req,res,db)})
// app.put('/image', (req,res)=>{
// 	const { id } = req.body; 
// 	db('users').where('id', '=', id )
// 	.increment('entries',1)
// 	.returning('entries')
// 	.then(entries=>
// 		{
// 			// console.log(entries)
// 			res.json(entries[0])
// 	}).catch(err=>res.status(400).json('unable to get entries'))
// 	// let found = false
// 		// database.users.forEach(user =>{
// 	// 	if(user.id === id){
// 	// 		found = true;
// 	// 		user.entries++
// 	// 		return res.json(user.entries);
// 	// 	}
// 	// })
// 	// if(!found){
// 	// 	res.status(404).json('fail')
// 	// }
// })

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });


app.post('/imageurl', (req,res)=>{image.handleApiCall(req,res)})


//port shoud keep secreat
app.listen(3000, ()=>{
	console.log('app is running on port 3000');
})

// console.log(process.env)

/*
/ => res = this is working
/signin => POST  = success/fail
/register => POST = user
/profile/:userId => GET = user
/image => PUT => user
*/

//bcrypt-nodejs(still) => both on mac,window,linnux  => no update 
 // || new feature: bcrypt vs bcrpt.js


 /*

const app =require('http')
	.createServer((req,res)=> res.send('ohohh'));

const DATABASE_URL = process.env.DATABASE_URL
app.listten(300, ()=>{
	console.log('server is listening on port ${DATABASE_URL}')
})

 */