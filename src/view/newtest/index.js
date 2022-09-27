import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './newtest.css';
import { Link } from 'react-router-dom';
import NavBar from '../../components/navbar';
import firebase from '../../config/firebase'


function NewTest({match}) {
    const [msgTipo, setMsgTipo] = useState();
    const [data, setData] = useState();
    const [hora, setHora] = useState();
    const [sala, setSala] = useState();
    const [disciplina, setDisciplina] = useState();
    const [tema, setTema] = useState();
    const [carregando, setCarregando] = useState(0);
    const usuarioEmail = useSelector(state => state.usuarioEmail);
    const db = firebase.firestore();

    useEffect(() => {
        if (match.params.testid) {
            firebase.firestore().collection('tests').doc(match.params.testid).get().then(resultado => {
                setData(resultado.data().data);
                setHora(resultado.data().hora);
                setSala(resultado.data().sala);
                setDisciplina(resultado.data().disciplina);
                setTema(resultado.data().tema);
            })
        }
    }, [carregando])

    function atualizar() {
        setCarregando(1);
        setMsgTipo(null);
        db.collection('tests').doc(match.params.testid).update({
            data: data,
            hora: hora,
            sala:sala,
            disciplina: disciplina,
            tema: tema
        }).then(() => {
            setMsgTipo('ok');
            setCarregando(0);
        }).catch(erro => {
            setMsgTipo('erro')
            setCarregando(0);
        })
    }

    function cadastrar() {
        setCarregando(1);
        db.collection('tests').add({
            data: data,
            hora: hora,
            sala:sala,
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
                        <h3 className='fonte-etc mx-auto my-3'>{match.params.testid ? 'alterar dados da prova' : 'adicionar nova prova'}</h3>
                    </div>
                    <form>
                        <div className='form-group'>
                            <div className='form-group row'>
                                <div className='col-6'>
                                    <label className='font-weight-bold my-1'>data da avaliação:</label>
                                    <input onChange={(e) => setData(e.target.value)} className='col-sm-10 mx-auto form-control mb-3 border border-dark rounded' type='date' value={data} />
                                </div>
                                <div className='col-6'>
                                    <label className='font-weight-bold my-1'>hora da avaliação:</label>
                                    <input onChange={(e) => setHora(e.target.value)} className='col-sm-8 mx-auto form-control mb-3 border border-dark rounded' type='time' value={hora} />
                                </div>
                            </div>
                            <label className='font-weight-bold my-1'>sala:</label>
                            <input onChange={(e) => setSala(e.target.value)} className='col-sm-6 mx-auto form-control mb-3 border border-dark rounded' type='text' value={sala} />

                            <label className='font-weight-bold my-1'>disciplina:</label>
                            <input onChange={(e) => setDisciplina(e.target.value)} className='col-sm-6 mx-auto form-control mb-3 border border-dark rounded' type='text' value={disciplina} />

                            <label className='font-weight-bold my-1'>tema:</label>
                            <input onChange={(e) => setTema(e.target.value)} className='col-sm-6 mx-auto form-control mb-3 border border-dark rounded' type='text' value={tema} />

                            <div className='row mx-auto'>
                                {
                                    carregando ? <div class="spinner-border text-secondary mx-auto" role="status"><span class="sr-only">carregando...</span></div>
                                        : <button onClick={match.params.testid ? atualizar : cadastrar} type='button' className='btn btn-salvar btn-lg mx-auto mb-4'>{match.params.testid ? 'alterar' : 'salvar'}</button>

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

export default NewTest;