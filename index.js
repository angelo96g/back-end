const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const mysql = require('mysql2');


const app = express();
// const PORT = 3000;
// const JWT_SECRET = 'your-256-bit-secret'; // Sostituisci con una chiave segreta sicura

app.use(cors());
app.use(cors({ origin: '*' }));
app.use(bodyParser.json()); // Middleware per gestire il corpo delle richieste JSON



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

// app.listen(PORT, () => {
//   console.log(`Server in ascolto su ${PORT}`);
// });

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server in ascolto sulla porta ${process.env.PORT || 3000}`);
});
