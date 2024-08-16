//로그인 페이지
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './css/Login.module.css';
import LoginMiddle from '../middle.components/LoginMiddle';

function LoginPage() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const LoginButton = async () => {
        try {
            const response = await axios.post('')
            if (response.status === 200);
            alert('로그인 되었습니다.');
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.loginContainer}>
            <LoginMiddle />
            <div className={styles.loginTopLine}>
                <div className={styles.loginMainContainer}>
                    <div className={styles.loignBar}>
                        <p className={styles.loginPtag}>아이디</p>
                        <input type='text' value={id} onChange={(e) => setId(e.target.value)} className={styles.loginInput} />
                    </div>
                    <div className={styles.loignBar}>
                        <p className={styles.loginPtag}>비밀번호</p>
                        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className={styles.loginInput} />
                    </div>
                    <button onClick={LoginButton} className={styles.loginButton}>로그인</button>
                </div>
            </div>
            <div className={styles.loginLinkContainer}>
                <Link to='/findId' className={styles.loginLink}>아이디 찾기</Link>
                <Link to='/findPassword' className={styles.loginLink}>비밀번호 찾기</Link>
                <Link to='/register' className={styles.loginLink}>회원가입</Link>
            </div>
        </div>
    )
}
export default LoginPage;