import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './pwrecover.css';
import firebase from '../../config/firebase';
import 'firebase/auth';
import Navbar from '../../components/navbar';


function PWrecover() {

    const [email,setEmail] = useState(); 
    const [msg, setmsg] = useState();

    function recuperaSenha(){
        firebase.auth().sendPasswordResetEmail(email).then(resultado=>{
            setmsg('foi enviado um email para redefinir sua senha');
        }).catch(error =>{
            setmsg('insira um email válido.');
        })
    } 

    return (
        <>
            <Navbar />
            <div className='formulario flexbox p-5'>
                <div className='form-group recuperar mx-auto'>
                    <h2 className='pt-4'>Recuperar senha</h2>
                    <input onChange={e => setEmail(e.target.value)} type='email' className='form-control mx-2form-login mt-4' placeholder='email' />
                    <div className='my-6 msg'><span>{msg}</span></div>
                    <button onClick={recuperaSenha} type='button' className='btn btn-recover my-4'>recupere minha senha</button>

                </div>
            </div>
        </>
    )
}

export default PWrecover;