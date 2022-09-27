import React, { useState, useEffect } from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar';
import { useSelector } from 'react-redux';
import Task from '../../components/task';
import Test from '../../components/test';
import firebase from '../../config/firebase';

function Home({match}) {
    const usuarioEmail = useSelector(state => state.usuarioEmail);
    const [tarefas, setTarefas] = useState([]);
    const [provas, setProvas] =useState([]);
    var taskslist= [];
    var testslist= [];

    
        firebase.firestore().collection('tasks').where('usuario','==',usuarioEmail).get().then(async (resT) => {
            await resT.docs.forEach(doc => {
                taskslist.push({
                    id: doc.id,
                    ...doc.data()
                })

            })
            // console.log(taskslist);
            // const types = {
            //     usuario : 'usuario',
            //     data : 'data'
            //}
            // const coluna = types[data]
            // taskslist.sort((a,b)=>b[coluna]-a[coluna]);
            setTarefas(taskslist);
        })

        firebase.firestore().collection('tests').where('usuario','==',usuarioEmail).get().then(async (resP) => {
            await resP.docs.forEach(doc => {
                testslist.push({
                    id: doc.id,
                    ...doc.data()
                })

            })
            setProvas(testslist);
        })
        
    return (
        <>
            <Navbar />
            {
                useSelector(state => state.usuarioLogado) > 0 ?
                    <>
                        <div className='col-12 flexbox telamain'>
                        <div className='flex mx-auto painel center-text my-2'>
                                <div className='flexbox barra'><span className=' my-2'><strong className='text-dark'>Tarefas:</strong></span></div> 
                                <div className='row'>
                                    {
                                        tarefas.map(itemtask => <Task t_id={itemtask.id} t_disciplina={itemtask.disciplina} t_data={itemtask.data} t_tema={itemtask.tema} />)
                                    }
                                </div>
                            </div>
                            
                            <div className='flexbox mx-auto painel center-text my-2'>
                                <div className='flexbox barra'><span className='my-2'><strong className='text-dark'>Provas:</strong></span></div> 
                                <div className='row'>
                                {
                                        provas.map(itemtest => <Test p_id={itemtest.id} p_sala={itemtest.sala} p_data={itemtest.data} p_hora={itemtest.hora} p_disciplina={itemtest.disciplina} p_tema={itemtest.tema} />)
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                    : <div className='col-12 d-flex tela'>
                        <div className='mx-auto p-4 painel col-6 my-auto texto-main'>
                            <h1>Bem-vindo ao Syllabus</h1>
                            <h2>faça login para ver suas atividades</h2>
                            <h2>ou caso seja novo por aqui, cadastre-se para começar.</h2>
                        </div>

                    </div>
            }
        </>
    )
}

export default Home;