const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const mysql = require('mysql2');


const app = express();
const PORT = 3000;
// const JWT_SECRET = 'your-256-bit-secret'; // Sostituisci con una chiave segreta sicura

app.use(cors());
app.use(bodyParser.json()); // Middleware per gestire il corpo delle richieste JSON

// // In-memory user storage for demonstration purposes (use a database in production)
// const users = [];

// // Endpoint per la registrazione degli utenti
// app.post('/register', (req, res) => {
//   const { username, password } = req.body;
  
//   if (!username || !password) {
//     return res.status(400).send('Username e password sono richiesti');
//   }

//   const hashedPassword = bcrypt.hashSync(password, 8); // Crittografa la password

//   users.push({ username, password: hashedPassword });
//   console.log('Incoming request: ' + JSON.stringify(req.body))
//   res.status(201).send('Utente registrato con successo');
// });

// // Endpoint per il login
// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
  
//   const user = users.find(u => u.username === username);
  
//   if (!user || !bcrypt.compareSync(password, user.password)) {
//     return res.status(401).send('Username o password non validi');
//   }

//   const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' }); // Crea un token JWT
//   res.json({ token });
// });

// app.get('/test',(req,res)=>{
//   const a = parseInt(req.query['a'])
//   const b = parseInt(req.query['b'])
//   let c
//   const operazione = req.query['operazione']
//   switch(operazione) {
//     case '+':
//       c = a+b
//       break
//     case '-':
//       c = a-b
//       break
//     case ':':
//       c = a / b
//       break
//     case '/':
//       c = a / b
//       break
//     case 'x':
//       c = a * b
//       break
//     default:
//       c = 'Operazione non valida'
//       break
//   }
//   return res.send(c.toString())
// })

// // Middleware per verificare i token JWT
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
  
//   if (token == null) return res.sendStatus(401);
  
//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// };

// // Endpoint protetto che richiede autenticazione
// app.get('/protected', authenticateToken, (req, res) => {
//   res.send('Contenuto protetto');
// });

// Endpoint per ottenere i dati dal file JSON
app.get('/action-figures', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'actionfigure.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Errore durante la lettura del file:', err);
      res.status(500).send('Errore del server');
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseError) {
      console.error('Errore durante il parsing dei dati JSON:', parseError);
      res.status(500).send('Errore del server');
    }
  });
});


const db = mysql.createConnection({
  host: 'localhost',   // Il tuo host
  user: 'root',        // Il tuo utente MySQL
  password: 'angelo12.1996',        // La tua password MySQL
  database: 'pc'       // Il tuo nome del database
});

db.connect(err => {
  if (err) {
      console.error('Errore di connessione al database:', err);
      return;
  }
  console.log('Connesso al database MySQL');
});

app.get('/products', (req, res) => {
  const query = 'SELECT * FROM `pc-gaming`';
  db.query(query, (err, results) => {
      if (err) {
          console.error(err);
          res.status(500).send(err);
      } else {
          res.json(results);
      }
  });
});

app.listen(PORT, () => {
  console.log(`Server in ascolto su ${PORT}`);
});
