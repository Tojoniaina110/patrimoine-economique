import possessionsData from '../Data.js';  // Assure-toi d'utiliser l'extension .js
import express from 'express';
const router = express.Router();





//maka liste an'ilay possession
router.get('/', (req, res) => {
    res.json(possessionsData[0].data.possessions);
});

//m'créer possession
router.post('/create', (req, res) => {
    const { libelle, valeur, dateDebut, taux } = req.body;
    possessionsData.push({ libelle, valeur, dateDebut, taux, dateFin: null });
    res.status(201).json({ message: 'Possession created' });
});

//manao update poss
router.put('/:libelle', (req, res) => {
    const { libelle } = req.params;
    const { dateFin } = req.body;
    let possession = possessionsData.find(p => p.libelle === libelle);
    if (possession) {
        possession.dateFin = dateFin;
        res.json({ message: 'Possession updated' });
    } else {
        res.status(404).json({ message: 'Possession not found' });
    }
});

//mi'close an'ilay poss
router.post('/:libelle/close', (req, res) => {
    const { libelle } = req.params;
    let possession = possessionsData.find(p => p.libelle === libelle);
    if (possession) {
        possession.dateFin = new Date().toISOString().split('T')[0];
        res.json({ message: 'Possession closed' });
    } else {
        res.status(404).json({ message: 'Possession not found' });
    }
});

export default router;
 