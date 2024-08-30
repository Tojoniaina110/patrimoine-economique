import React, { useEffect, useState } from 'react';
import { getPossessions, closePossession } from '../services/possessionService';
import { useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const PossessionListPage = () => {
    const [possessions, setPossessions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPossessions();
    }, []);

    const fetchPossessions = async () => {
        try {
            const response = await getPossessions();
            console.log(response); 
            setPossessions(response);
            
        } catch (error) {
            console.error('Erreur lors du fetch des possessions:', error);
        }
    };
    
    const handleClosePossession = async (libelle) => {
        try {
            await closePossession(libelle);
            fetchPossessions(); 
        } catch (error) {
            console.error('Erreur lors de la clôture de la possession:', error);
        }
    };
    

    return (
        <div>
            <h2 className='text-center mt-3 text-primary'>Liste des Possessions</h2>
            
            <Table bordered border={4} className="mt-5 container">
                <thead>
                    <tr className="text-center">
                        <th>Libelle</th>
                        <th>Valeur</th>
                        <th>Date Début</th>
                        <th>Date Fin</th>
                        <th>Taux Ammortissement</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {possessions.map(possession => (
                        <tr key={possession.libelle}>
                            <td>{possession.libelle}</td>
                            <td>{possession.valeur}</td>
                            <td>{possession.dateDebut}</td>
                            <td>{possession.dateFin || 'En cours'}</td>
                            <td>{possession.tauxAmortissement}</td>
                            <td>
                                <button className="btn btn-info p-1 m-1"  onClick={() => navigate(`/possession/${possession.libelle}/update`)}>Edit</button>
                                <button className="btn btn-danger p-1 m-1" onClick={() => handleClosePossession(possession.libelle)}>Close</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <button className="btn btn-primary m-3" onClick={() => navigate('/possession/create')}>Créer une Possession</button>
        </div>
    );
};

export default PossessionListPage;
