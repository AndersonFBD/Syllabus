import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import '../../view/newtask';


function Navbar() {
    const dispatch = useDispatch();
    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <h5 className="navbar-brand custom-font">Syllabus</h5>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fas fa-ellipsis-v text-white"></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    
                         {
                            useSelector(state => state.usuarioLogado) > 0 ?   
                            <>
                                <ul className="navbar-nav mr-auto">

                                    <li className="nav-item active"><Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                                    </li>
                                    <li className="nav-item active"><Link className="nav-link" to="/newtask"><i class="fas fa-plus-circle pr-2"/>Nova Tarefa <span className="sr-only">(current)</span></Link>
                                    </li>
                                    <li className="nav-item active"><Link className="nav-link" to="/newtest"><i class="fas fa-plus-circle pr-2"/>Nova Prova <span className="sr-only">(current)</span></Link>
                                    </li>

                                </ul>
                                <div className="form-inline my-2 my-lg-0">
                                    <Link onClick={() => dispatch({type: 'LOGOUT'})} className="btn btn-danger my-2 my-sm-0" >Logout</Link>
                                </div>
                            </>
                            
                            :
                            <>
                                <ul className="navbar-nav mr-auto">

                                    <li className="nav-item active"><Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                                    </li>

                                </ul>
                                <div className="form-inline my-2 my-lg-0">
                                    <Link to='/Signin' className='btn btn-outline-warning mx-3'>cadastro</Link>
                                    <Link to='/login' className="btn btn-success my-2 my-sm-0" >Login</Link>
                                </div>
                            </>
                        
                    }
                    
                </div>
            </nav>
        </>
    )
}


export default Navbar;