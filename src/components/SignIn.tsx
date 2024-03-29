import React, { useState } from 'react';
import { signInEmail } from '../firebase/firebase';
import { useDispatch } from 'react-redux';
import { login } from '../modules/user';
import { Action } from 'redux';
import { User } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import '../stylesheets/Sign.css'

const SignIn = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogin = (user: User) => dispatch(login({user}) as Action);

    const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleSumbit = async () => {
        try {
            const UserCredential = await signInEmail(email, password);
            onLogin(UserCredential.user);
            window.alert('로그인에 성공하였습니다.');
            navigate('../products/all');
        }
        catch (e) {
            window.alert('존재하지 않는 아이디거나 비밀번호가 잘못되었습니다.');
            console.error(e);
        }
    }

    return (
        <div className='sign'>
            <p className='title'>로그인</p>
            <input type='text' placeholder='이메일' onChange={handleInputEmail} value={email}></input>
            <input type='password' placeholder='비밀번호' onChange={handleInputPassword} value={password}></input>
            <button type='submit' onClick={handleSumbit}>로그인</button>
            <span>계정이 없습니까?</span>
            <Link className='link' to='../sign-up'>가입하기</Link>
        </div>
    )
}

export default SignIn;