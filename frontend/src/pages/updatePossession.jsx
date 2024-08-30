import React, { useState, useEffect } from 'react';
import { updatePossession, getPossessions } from '../services/possessionService';
import { useParams, useNavigate } from 'react-router-dom';

const UpdatePossessionPage = () => {
    const { libelle } = useParams();
    const [dateFin, setDateFin] = useState('');
    const [currentPossession, setCurrentPossession] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPossession = async () => {
            try {
                const response = await getPossessions();
                console.log(response);
                const possession = response.find(p => p.libelle === libelle);
                if (possession) {
                    setCurrentPossession(possession);
                } else {
                    console.error('Possession not found');
                }
            } catch (error) {
                console.error('Failed to fetch possession', error);
            }
        };
        fetchPossession();
    }, [libelle]);

    const handleUpdatePossession = async () => {
        await updatePossession(libelle, { dateFin });
        navigate('/possession');
    };

    return (
        <div>
            <h2 className='m-3 text-center text-primary'>Mettre à jour la Possession</h2>
            {currentPossession ? (
                <div className='m-5'>
                    <p>Libelle: {currentPossession.libelle}</p>
                    <p>Date Début: {currentPossession.dateDebut}</p>
                    <div className="form row mb-5 mt-3">
                        <label className="col-sm-2 control-label">Nouvelle date: </label>
                        <div className="col-sm-4">
                            <input className='form-control' type="date" value={dateFin} onChange={(e) => setDateFin(e.target.value)} />
                        </div>
                    </div>
                    <button className='btn btn-success m-5' onClick={handleUpdatePossession}>Mettre à Jour</button>
                </div>
                
            ) : (
                <p>Chargement...</p>
            )}
        </div>
    );
    
};

export default UpdatePossessionPage;
