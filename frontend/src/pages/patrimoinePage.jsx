import React, { useState } from 'react';
import { getValeurPatrimoine, getValeurPatrimoineRange } from '../services/patrimoineService';
import { Line } from 'react-chartjs-2';

const PatrimoinePage = () => {
    const [date, setDate] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [jour, setJour] = useState(1);
    const [patrimoineValue, setPatrimoineValue] = useState(null);
    const [rangeData, setRangeData] = useState([]);

    const handleGetValeurPatrimoine = async () => {
        try {
            const response = await getValeurPatrimoine(date);
            console.log('Valeur du patrimoine:', response.data);
            console.log('Response:', response.data);
            setPatrimoineValue(response.data.valeur);
        } catch (error) {
            console.error('Erreur lors de la récupération de la valeur du patrimoine:', error);
        }
    };

    const handleGetValeurPatrimoineRange = async () => {
        try {
            const response = await getValeurPatrimoineRange({ type: 'month', dateDebut, dateFin, jour });
            console.log('Données de la plage:', response.data);
            setRangeData(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des valeurs de la plage:', error);
        }
    };

    const chartData = {
        labels: rangeData.map(data => data.date),
        datasets: [
            {
                label: 'Valeur Patrimoine',
                data: rangeData.map(data => data.valeur),
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    return (
        <div className='m-3'>
            <h2 className='text-center mt-3 text-primary'>Votre patrimoine</h2>
            <div>
                <div className="form row mt-3 mb-3">
                    <label className="col-sm-2 control-label">Veiller entrer la date: </label>
                    <div className="col-sm-4">
                        <input className='form-control' type="date" value={date} onChange={(e) => setDate(e.target.value)} />  
                    </div>
                </div>
                <button className='btn btn-primary m-3 mb-5' onClick={handleGetValeurPatrimoine}>Valider</button>
                {patrimoineValue && <p>Valeur du Patrimoine à la date {date} est : {patrimoineValue}</p>}
            </div>
            <div>
            <h3>Plage de date</h3>
            <div className="form row mt-3 mb-3">
                <label className="col-sm-2 control-label">Date du début : </label>
                <div className="col-sm-3">
                    <input className='form-control' type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} />
                </div>
            </div>
            <div className="form row mt-3 mb-3">
                <label className="col-sm-2 control-label">Date fin : </label>
                <div className="col-sm-3">
                    <input className='form-control' type="date" value={dateFin} onChange={(e) => setDateFin(e.target.value)} />
                </div>
            </div>
            <div className="form row mt-3 mb-3">
                <label className="col-sm-2 control-label">jour : </label>
                <div className="col-sm-3">
                <select className='p-1' value={jour} onChange={(e) => setJour(parseInt(e.target.value))} >
                    <option value={1}>Lundi</option>
                    <option value={2}>Mardi</option>
                    <option value={3}>Mercredi</option>
                    <option value={4}>Jeudi</option>
                    <option value={5}>Vendredi</option>
                    <option value={6}>Samedi</option>
                    <option value={0}>Dimanche</option>
                </select>      
                </div>
            </div>
            </div>
            <button className='btn btn-primary m-2' onClick={handleGetValeurPatrimoineRange}>Valider Plage</button>
            
        </div>
    );
};

export default PatrimoinePage;


/*
<div>
                <h3>Plage de dates</h3>
                <input className='form-control' type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} />
                <input className='form-control' type="date" value={dateFin} onChange={(e) => setDateFin(e.target.value)} />
                <input className='form-control' type="number" value={jour} onChange={(e) => setJour(e.target.value)} />
                <button onClick={handleGetValeurPatrimoineRange}>Valider Plage</button>
                <Line data={chartData} />
            </div>
*/