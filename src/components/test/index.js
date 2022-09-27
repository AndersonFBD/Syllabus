import React from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../config/firebase'
import './test.css';

function Test({p_id, p_tema, p_sala, p_data, p_hora, p_disciplina}) {
    const db = firebase.firestore();
   

    function deletaProva(){
        var id = `${p_id}`;
        console.log(id);
        db.collection('tests').doc(id).delete().then(() => {
            console.log("apagou");
        }).catch((error)=>{
            console.error(error);
        })
        
    }


    return (
        <>
            <div className="card my-4 mx-4 cardtest">
                <div className="card-body">
                    <h5 className="card-title">data: {p_data} </h5>
                    <h6 className="card-subtitle mb-2 text-muted">hora: {p_hora} </h6>
                    <h6 className="card-subtitle mb-2 text-muted">Sala: {p_sala}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">Disciplina: {p_disciplina} </h6>
                    <p className="card-text">tema: {p_tema}</p>
                    <Link to={`/edit-test/${p_id}`} type='button' className="card-link btn-sm btn-warning botao"><i class="fas fa-pencil-alt" /> editar</Link>
                    <button onClick={deletaProva} className="card-link btn-sm btn-danger botao"><i class="fas fa-trash-alt text-color-danger" /> Apagar</button>
                </div>
            </div>
        </>
    )
}

export default Test;