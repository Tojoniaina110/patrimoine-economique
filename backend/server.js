import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { readFile, writeFile } from '../data/data.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());

app.use(morgan('combined'));

app.use(cors(
    {
        origin: 'http://localhost:5173',
    }
));
app.use(express.json());


app.get('/api/possession', async (req, res) => {
    try {
        const result = await readFile('./data/data.json');
        if (result.status === "OK") {
            res.json(result.data[1].data.possessions);
        } else {
            res.status(500).json({ message: "Erreur de lecture des données", error: result.error });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur du serveur", error });
    }
});

// Endpoint for possession
app.post('/api/possession', async (req, res) => {
    try {
        const newPossession = req.body;
        const result = await readFile('./data/data.json');

        if (result.status === "OK") {
            const data = result.data;
            data[1].data.possessions.push(newPossession);

            const writeResult = await writeFile('./data/data.json', data);
            if (writeResult.status === "OK") {
                res.status(201).json(newPossession);
            } else {
                res.status(500).json({ message: "Erreur d'écriture de donnée", error: writeResult.error });
            }
        } else {
            res.status(500).json({ message: "Erreur de lecture des données", error: result.error });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur du serveur", error });
    }
});

// Endpoint to create possession
app.post('/api/possession/create', async (req, res) => {
    const { libelle, valeur, dateDebut, taux, possesseur } = req.body;

    if (!libelle || !valeur || !dateDebut || !taux || !possesseur) {
        return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
    }

    try {
        const result = await readFile('./data/data.json');
        if (result.status !== "OK") {
            return res.status(500).json({ error: 'Échec de la lecture des données' });
        }

        const data = result.data;

        if (!Array.isArray(data) || !data[1] || !data[1].data || !Array.isArray(data[1].data.possessions)) {
            return res.status(500).json({ error: 'Format de données invalide' });
        }

        data[1].data.possessions.push({
            possesseur,
            libelle,
            valeur,
            dateDebut,
            taux,
            dateFin: null,
        });

        const writeResult = await writeFile('./data/data.json', data);
        if (writeResult.status !== "OK") {
            return res.status(500).json({ error: 'Échec de l\'écriture des données' });
        }

        res.status(201).json({ message: 'Possession créée avec succès', possession: req.body });
    } catch (error) {
        console.error('Error during /api/possession/create:', error);
        res.status(500).json({ message: "Erreur du serveur", error });
    }
});

//Get possession
app.get('/api/possession/:libelle', async (req, res) => {
    try {
        const { libelle } = req.params;
        console.log(`Recherche de la possession avec le libelle: ${libelle}`);

        const result = await readFile('./data/data.json');

        if (result.status === "OK") {
            const data = result.data;
            const possession = data[1].data.possessions.find(p => p.libelle === libelle);

            if (possession) {
                console.log(`Possession trouvée: ${JSON.stringify(possession)}`);
                res.status(200).json(possession);
            } else {
                console.log(`Possession non trouvée pour le libelle: ${libelle}`);
                res.status(404).json({ message: "Possession introuvable" });
            }
        } else {
            res.status(500).json({ message: "Erreur de lecture des données", error: result.error });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur du serveur", error });
    }
});

// Endpoint to update a possession by libelle
app.put('/api/possession/:libelle', async (req, res) => {
    console.log(`Received request to update possession: ${req.params.libelle}`);
    try {
        const { libelle } = req.params;
        const { libelle: newLibelle, dateFin } = req.body;
        const result = await readFile('./data/data.json');

        if (result.status === "OK") {
            const data = result.data;
            const possession = data[1].data.possessions.find(p => p.libelle === libelle);

            if (possession) {
                possession.libelle = newLibelle || possession.libelle;
                possession.dateFin = dateFin || possession.dateFin;

                const writeResult = await writeFile('./data/data.json', data);
                if (writeResult.status === "OK") {
                    res.status(200).json(possession);
                } else {
                    res.status(500).json({ message: "Erreur d'écriture des données", error: writeResult.error });
                }
            } else {
                res.status(404).json({ message: "Possession introuvalble" });
            }
        } else {
            res.status(500).json({ message: "Erreur de lecture de données", error: result.error });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur du serveur", error });
    }
});

// Endpoint to close a possession by setting dateFin to the current date
app.put('/api/possession/:libelle/close', async (req, res) => {
    try {
        const { libelle } = req.params;
        const result = await readFile('./data/data.json');

        if (result.status === "OK") {
            const data = result.data;
            const possession = data[1].data.possessions.find(p => p.libelle === libelle);

            if (possession) {
                possession.dateFin = new Date().toISOString();

                const writeResult = await writeFile('./data/data.json', data);
                if (writeResult.status === "OK") {
                    res.status(200).json(possession);
                } else {
                    res.status(500).json({ message: "Erreur d'écriture des données", error: writeResult.error });
                }
            } else {
                res.status(404).json({ message: "Possession introuvable" });
            }
        } else {
            res.status(500).json({ message: "Erreur lecture des données", error: result.error });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur du serveur", error });
    }
});

// Endpoint to delete a possession by libelle
app.delete('/api/possession/:libelle', async (req, res) => {
    try {
        const { libelle } = req.params;
        const result = await readFile('./data/data.json');

        if (result.status === "OK") {
            const data = result.data;
            const index = data[1].data.possessions.findIndex(p => p.libelle === libelle);

            if (index !== -1) {
                data[1].data.possessions.splice(index, 1);

                const writeResult = await writeFile('./data/data.json', data);
                if (writeResult.status === "OK") {
                    res.status(200).json({ message: "Possession supprimée avec succès" });
                } else {
                    res.status(500).json({ message: "Erreur d'écriture des données", error: writeResult.error });
                }
            } else {
                res.status(404).json({ message: "Possession non trouvée" });
            }
        } else {
            res.status(500).json({ message: "Erreur de lecture des données", error: result.error });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur du serveur", error });
    }
});

// Endpoint to get patrimoine value by date
app.get('/api/patrimoine/:date', async (req, res) => {
    try {
        const result = await readFile('./data/data.json');
        if (result.status === "OK") {
            const date = req.params.date;
            const patrimoine = result.data[1].data.possessions.reduce((total, possession) => {
                const dateDebut = new Date(possession.dateDebut);
                const dateFin = possession.dateFin ? new Date(possession.dateFin) : null;
                const currentDate = new Date(date);

                if (currentDate >= dateDebut && (!dateFin || currentDate <= dateFin)) {
                    total += possession.valeur;
                }
                return total;
            }, 0);
            res.json({ date, valeur: patrimoine });
        } else {
            res.status(500).json({ message: "Erreur de lecture des données", error: result.error });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur du serveur", error });
    }
});

// Endpoint to get patrimoine value by range
app.post('/api/patrimoine/range', async (req, res) => {
    try {
        const { dateDebut, dateFin, jour } = req.body;
        const result = await readFile('./data/data.json');

        if (result.status === "OK") {
            const patrimoineByMonth = [];
            let currentDate = new Date(dateDebut);
            const endDate = new Date(dateFin);

            while (currentDate <= endDate) {
                const patrimoineValue = result.data[1].data.possessions.reduce((total, possession) => {
                    const dateDebutPossession = new Date(possession.dateDebut);
                    const dateFinPossession = possession.dateFin ? new Date(possession.dateFin) : null;

                    if (currentDate >= dateDebutPossession && (!dateFinPossession || currentDate <= dateFinPossession)) {
                        total += possession.valeur;
                    }
                    return total;
                }, 0);

                patrimoineByMonth.push({ date: currentDate.toISOString().split('T')[0], valeur: patrimoineValue });

                currentDate.setMonth(currentDate.getMonth() + 1);
            }

            res.json(patrimoineByMonth);
        } else {
            res.status(500).json({ message: "Erreur de lecture des données", error: result.error });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur du serveur", error });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});