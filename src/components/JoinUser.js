import {React, useState, useEffect} from 'react';
import axios from 'axios';

import Diary from './BlogList'
import './JoinUser.css';

function JoinUser() {

    const [name, SetName] = useState('');
    const [pswd, SetPswd] = useState('');
    const [email, SetEmail] = useState('');
    const [btnClick, SetBtnClick] = useState(false);// when button clicked blogs are shown
    const [checkName, SetCheckName] = useState(false);// required in name didnt worked
    const [isLogin, SetIsLogin] = useState(true);// user is logging in (old user) or signing in (new user)

    const HandleEmail = (e) => {
        SetBtnClick(false);
        SetEmail(e.target.value);
    };

    const HandlePswd = ((e) => {
        SetBtnClick(false);
        SetPswd(e.target.value);
    });

    const HandleName = ((e) => {
        SetBtnClick(false);
        SetName(e.target.value);
        (name !== '') ? SetCheckName(true) : SetCheckName(false);
    }); 

    const HandleButtonClick = ((e) => {
        e.preventDefault();
        if(email !== '' && pswd !== '' && isLogin === true){
            SetBtnClick(true);
        } else if(name !== '' && email !== '' && pswd !== '' && isLogin === false){
            SetBtnClick(true);
        }   
    });

    const HandleToggle = (() => {
        SetIsLogin(!isLogin);
    });

    useEffect(()  => {
        async function HandleApiRequest() {
            if(btnClick === true && isLogin === false){
                const contact = {
                    name: name,
                    email: email,
                    pswd: pswd
                }
                await axios.post(`http://localhost:3001/new-user`, contact);
            }
            else if(btnClick === true && isLogin === true){
                const contact = {
                    email: email,
                    pswd: pswd
                }
                await axios.post(`http://localhost:3001/existing-user`, contact);
            }
        }
        HandleApiRequest();
    }, [btnClick]);

  return (
    <div>
        {
            (btnClick === false || (checkName === false && isLogin === false)) ? 
            <div className="wrapper">
            <div className="card-switch">
                <label className="switch">
                <input type="checkbox" className="toggle" onClick={HandleToggle} />
                <span className="slider"></span>
                <span className="card-side"></span>
                <div className="flip-card__inner">
                    <div className="flip-card__front">
                        <div className="title">Log in</div>
                        <form className="flip-card__form" action="">
                            <input className="flip-card__input" placeholder="Email" type="email" onChange={HandleEmail} />
                            <input className="flip-card__input" placeholder="Password" type="password" onChange={HandlePswd} />
                            <button className="flip-card__btn submit" onClick={HandleButtonClick} >Let`s go!</button>
                        </form>
                    </div>
                    <div className="flip-card__back">
                        <div className="title">Sign up</div>
                        <form className="flip-card__form" action="">
                            <input className="flip-card__input" placeholder="Name" type="text" onChange={HandleName} required /> 
                            <input className="flip-card__input" placeholder="Email" type="email" onChange={HandleEmail} />
                            <input className="flip-card__input" placeholder="Password" type="password" onChange={HandlePswd} />
                            <button className="flip-card__btn submit" onClick={HandleButtonClick} >Confirm!</button>
                        </form>
                    </div>
                </div>
                </label>
            </div>   
        </div>
        : <Diary />
        }
    </div>
  )
}

export default JoinUser;