import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './newtask.css';
import { Link } from 'react-router-dom';
import NavBar from '../../components/navbar';
import firebase from '../../config/firebase'


function NewTask({ match }) {
    const [msgTipo, setMsgTipo] = useState();
    const [data, setData] = useState();
    const [disciplina, setDisciplina] = useState();
    const [tema, setTema] = useState();
    const [carregando, setCarregando] = useState(0);
    const usuarioEmail = useSelector(state => state.usuarioEmail);
    const db = firebase.firestore();


    useEffect(() => {
        if (match.params.taskid) {
            firebase.firestore().collection('tasks').doc(match.params.taskid).get().then(resultado => {
                setData(resultado.data().data);
                setDisciplina(resultado.data().disciplina);
                setTema(resultado.data().tema);
            })
        }
    }, [carregando])

    function atualizar() {
        setCarregando(1);
        setMsgTipo(null);
        db.collection('tasks').doc(match.params.taskid).update({
            data: data,
            disciplina: disciplina,
            tema: tema
        }).then(() => {
            setMsgTipo('ok');
            setCarregando(0);
        }).catch(erro => {
            setMsgTipo('erro');
            setCarregando(0);
        })
    }

    function cadastrar() {
        setCarregando(1);
        db.collection('tasks').add({
            data: data,
            disciplina: disciplina,
            tema: tema,
            usuario: usuarioEmail,
        }).then(() => {
            setMsgTipo('ok');
            setCarregando(0);
        }).catch(() => {
            setMsgTipo('erro');
            setCarregando(0);
        })
    }

    return (
        <>
            <NavBar />
            <div className='col-12 tela'>
                <div className='painel-form mx-auto'>
                    <div className='row mx-auto'>
                        <h3 className='fonte-etc mx-auto my-3'>{match.params.taskid ? 'alterar' : 'adicionar nova tarefa'}</h3>
                    </div>
                    <form>
                        <div className='form-group'>
                            <label className='font-weight-bold my-1'>data da entrega:</label>
                            <input onChange={(e) => setData(e.target.value)} className='col-sm-6 mx-auto form-control mb-3 border border-dark rounded' type='date' value={data} />

                            <label className='font-weight-bold my-1'>disciplina:</label>
                            <input onChange={(e) => setDisciplina(e.target.value)} className='col-sm-6 mx-auto form-control mb-3 border border-dark rounded' type='text' value={disciplina} />
                            <
                                label className='font-weight-bold my-1'>tema:</label>
                            <input onChange={(e) => setTema(e.target.value)} className='col-sm-6 mx-auto form-control mb-3 border border-dark rounded' type='text' value={tema} />

                            <div className='row mx-auto'>
                                {
                                    carregando ? <div class="spinner-border text-secondary mx-auto" role="status"><span class="sr-only">carregando...</span></div>
                                        : <button onClick={match.params.taskid ? atualizar : cadastrar} type='button' className='btn btn-salvar btn-lg mx-auto mb-4'>{match.params.taskid ? 'alterar' : 'salvar'}</button>

                                }

                            </div>

                            <div className='text-center my-3'>
                                {
                                    msgTipo === 'ok' && <span className='text-success'>Tarefa adicionada</span>
                                }

                                {
                                    msgTipo === 'erro' && <span className='text-danger'>falha na adição da tarefa</span>
                                }

                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default NewTask;