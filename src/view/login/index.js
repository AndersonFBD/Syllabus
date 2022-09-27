import React, {useState} from 'react';
import './login.css';
import {Link, Redirect} from 'react-router-dom';
import firebase from '../../config/firebase';
import 'firebase/auth';
import {useSelector, useDispatch} from 'react-redux';

function Login() {

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const dispatch  = useDispatch();
    
    function autenticar(){
        firebase.auth().signInWithEmailAndPassword(email,senha).then(resultado =>{
            setMsgTipo('ok');
            setTimeout(() => {
              dispatch({type: 'LOGIN', usuarioEmail: email})
            }, 2000);
            
      })
        .catch(erro =>{
            setMsgTipo('erro');
        })
    }

    return (
        <>
            <div className='d-flex align-items-center tela'>
                {
                    useSelector(state => state.usuarioLogado) > 0 ? <Redirect to='/' /> : null
                }


                <form className="form-signin mx-auto">
                    <div className="text-center mb-4">
                        <i className="fas fa-university fa-4x mb-2"></i><br />
                        <h3 className='py-5 titulo-fonte'>bem-vindo ao Syllabus</h3>
                        <h5>entre com seu login</h5>
                     </div>

                    <div className="form-label-group my-2">
                        <input onChange={(e)=> setEmail(e.target.value)} type="email" id="inputEmail" className="form-control my-2" placeholder="Email" required autofocus />
                        <input onChange={(e)=> setSenha(e.target.value)} type="password" id="inputPassword" className="form-control my-2" placeholder="Senha" required />
                        <button onClick ={autenticar} className="btn btn-lg btn-block btn-logar font-weight-bold" type="button">Login</button>
                    </div>

                    <div className='text-center my-3'>
                        {
                            msgTipo === 'ok' && <span className='text-success'>Login bem sucedido</span>
                        }

                        {
                            msgTipo === 'erro' && <span className='text-danger'>verifique suas informações e tente de novo</span>
                        }
                        
                    </div>

                    <div className='mt-3 cor-link'>
                    <Link to='Signin' className='px-2'>cadastre-se</ Link>
                    <Link to='recover' className='px-2'>esqueceu a senha?</ Link>
                    </div>

                </form>
            </div>
        </>
    )
}

export default Login;