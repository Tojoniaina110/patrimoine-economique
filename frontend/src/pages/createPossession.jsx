import React, { useState } from 'react';
import { createPossession } from '../services/possessionService';
import { useNavigate } from 'react-router-dom';

const CreatePossessionPage = () => {
    const [libelle, setLibelle] = useState('');
    const [valeur, setValeur] = useState(0);
    const [dateDebut, setDateDebut] = useState('');
    const [taux, setTaux] = useState(0);
    const navigate = useNavigate();

    const handleCreatePossession = async () => {
        await createPossession({ libelle, valeur, dateDebut, taux });
        navigate('/possession');
    };

    return (
        <div className='m-5'>
            <h2 className='text-center mt-3 text-primary mb-5'>Créer une Possession</h2>
            <div className="form row mt-3 mb-3">
                <label className="col-sm-2 control-label">Entrer libelle : </label>
                <div className="col-sm-4">
                    <input className='form-control' type="text" placeholder="Libelle" value={libelle} onChange={(e) => setLibelle(e.target.value)} />    
                </div>
            </div>
            <div className="form row mb-3">
                <label className="col-sm-2 control-label">Donner sa valeur : </label>
                <div className="col-sm-4">
                    <input className='form-control' type="number" placeholder="Valeur" value={valeur} onChange={(e) => setValeur(e.target.value)} /> 
                </div>
            </div>
            <div className="form row mb-3">
                <label className="col-sm-2 control-label">Veiller entrer la date : </label>
                <div className="col-sm-4">
                    <input className='form-control' type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} />
                </div>
            </div>
            <div className="form row mb-3">
                <label className="col-sm-2 control-label">Le taux d ammortissement : </label>
                <div className="col-sm-4">
                    <input className='form-control' type="number" placeholder="Taux" value={taux} onChange={(e) => setTaux(e.target.value)} />
                </div>
            </div>
            <br />
            <button className='btn btn-success m-5' onClick={handleCreatePossession}>Créer</button>
        </div>
        
    );
};

export default CreatePossessionPage;
