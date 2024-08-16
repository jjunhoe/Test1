import { Link, useNavigate } from 'react-router-dom';
import styles from './css/Header.module.css';
import { Navigate } from 'react-router-dom';
export default function Header() {
    const navigate = useNavigate();

    const iconClick = () => {
        navigate('/');
    }

    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerLink}>
                <Link to='/login' className={styles.loginLink}>로그인/회원가입</Link>
            </div>
            <div className={styles.headerLogin}>
                <img src='/img/대준수산.png' className={styles.headerIcon} onClick={iconClick} />
                <Link to='/food' className={styles.headerMenu}>메뉴</Link>
                <Link to='/sale' className={styles.headerMenu}>한정 세일</Link>
                <Link to='review' className={styles.headerMenu}>리뷰</Link>
                <Link to='center' className={styles.headerMenu}>고객센터</Link>
            </div>
        </div>
    )
};
