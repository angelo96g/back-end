const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Per consentire richieste cross-origin

const app = express();
const PORT = 3000;

app.use(cors()); // Abilita CORS per consentire richieste dal tuo progetto Angular

// Endpoint per ottenere i dati dal file JSON
app.get('/action-figures', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'actionfigure.json'); // Percorso aggiornato

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

app.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});
