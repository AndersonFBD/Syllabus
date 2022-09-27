import React, { useState } from 'react';
import firebase from '../../config/firebase'
import 'firebase/auth'
import './signin.css';
import Navbar from '../../components/navbar';



function SignIn() {

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [msg, setmsg] = useState();
    const [carregando, setcarregando] = useState();

    function cadastrar() {
        setMsgTipo(null);
        setcarregando(1)

        if (!email || !senha) {
            setMsgTipo('erro');
            setmsg('você não preencheu todos os campos');
            
        }

        firebase.auth().createUserWithEmailAndPassword(email, senha).then(resultado => {
            setcarregando(0);
            setMsgTipo('ok');
        }).catch(erro => {
            setcarregando(0);
            setMsgTipo('erro');
            switch (erro.message) {
                case 'The password must be 6 characters long or more.':
                    setmsg('a senha precisa ter pelo menos 6 caracteres');
                    break;
                case 'The email address is already in use by another account.':
                    setmsg('este email já está sendo usado');
                    break;
                case 'The email address is badly formatted.':
                    setmsg('formato inválido de email');
                    break;
                default:
                    setmsg('não foi possível cadastrar, tente novamente mais tarde.');
                    break;
            }
        });



    }

    return (
        <>
        <Navbar/>
            <div className='formulario d-flex p-5'>
                <form className='text-center form-login  mx-auto alinhar'>
                    <h1 className='h3 mb-3 text-black font-weight-bold fonte-custom'>Crie sua conta</h1>

                    <input onChange={(e) => setEmail(e.target.value)} type='email' className='form-control my-2' placeholder='email' />
                    <input onChange={(e) => setSenha(e.target.value)} type='password' className='form-control my-2' placeholder='senha' />
                    
                    {    
                    carregando ? <div className="spinner-border text-info" role="status"><span className="sr-only">Loading...</span></div>
                    : <button onClick={cadastrar} type='button' className='btn btn-lg mt-3 mb-5 btn-cadastrar'>criar conta</button>

                    }
                    
                    <div className='text-danger text-center my-3'>
                        {msgTipo === 'ok' && <span>conta criada com sucesso</span>}
                        {msgTipo === 'erro' && <span>{msg}</span>}
                    </div>

                </form>

            </div>
        </>
    )
}

export default SignIn;