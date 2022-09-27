import React, { useState, useEffect } from 'react';
import firebase from '../../config/firebase'
import { Link } from 'react-router-dom';
import './task.css';

function Task( { t_id, t_disciplina, t_data, t_tema } ) {
    const db = firebase.firestore();


    function deletaTarefa(){
        var id = `${t_id}`;
        console.log(id);
        db.collection('tasks').doc(id).delete().then(() => {

        }).catch((error)=>{
            console.error(error);
        })
        
    }


    return (
        <>
            <div className="card my-4 mx-4 cardtask">
                <div className="card-body">
                    <h5 className="card-title">data: {t_data}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Disciplina: {t_disciplina}</h6>
                    <p className="card-text">tema: {t_tema}</p>
                    <Link to={`/edit-task/${t_id}`} className="card-link btn-sm btn-warning botao"><i class="fas fa-pencil-alt" /> editar</Link>
                    <button onClick={deletaTarefa} className="card-link btn-sm btn-danger botao"><i class="fas fa-trash-alt text-color-danger" /> Apagar</button>
                </div>
            </div>
        </>
    )
}

export default Task;