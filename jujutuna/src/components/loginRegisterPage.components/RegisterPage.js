import { useState } from 'react';
import styles from './css/Registser.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [nick, setNick] = useState('');
    const [address, setAddress] = useState('');
    const [addressInfo, setAddressInfo] = useState('');
    const [gender, setGender] = useState('');
    const [showAddressFields, setShowAddressFields] = useState(false); // 주소 입력 필드 표시 여부
    const navigate = useNavigate();

    const insertBtnClick = async () => {
        try {
            const fullAddress = `${address} ${addressInfo}`; // 주소와 상세주소를 합침

            const response = await axios.post('http://localhost:9498/user/register', {
                userId: id,
                userPassword: password,
                userName: name,
                userNick: nick,
                userAddress: fullAddress, // 합친 주소를 서버로 전송
                userGender: gender
            });
            if (response.status === 200) {
                alert("회원가입 완료");
                console.log(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const findBtnClick = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                setAddress(data.address); // 찾은 주소를 address 상태에 저장
                setShowAddressFields(true); // 주소 입력 필드 표시
            }
        }).open();
    };

    const backBtnClick = () => {
        navigate('/login');
    };

    return (
        <div className={styles.registerContainer}>
            <div>
                <input type="text" placeholder="아이디" className={styles.registerInput} value={id} onChange={(e) => setId(e.target.value)} />
                <input type="password" placeholder="비밀번호" className={styles.registerInput} value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="text" placeholder='이름' className={styles.registerInput} value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="닉네임" className={styles.registerInput} value={nick} onChange={(e) => setNick(e.target.value)} />
                {!showAddressFields && ( // 주소찾기 버튼 표시
                    <button onClick={findBtnClick} className={styles.findAddress}>주소찾기</button>
                )}
                {showAddressFields && ( // 주소 및 상세주소 입력 필드 표시
                    <div>
                        <input type='text' placeholder='주소' className={styles.registerInput} value={address} readOnly />
                        <input type='text' placeholder='상세주소' className={styles.registerInput} value={addressInfo} onChange={(e) => setAddressInfo(e.target.value)} />
                    </div>
                )}
            </div>
            <div>
                <button onClick={() => setGender('M')} className={gender === 'M' ? styles.selectedButton : ''}>남자</button>
                <button onClick={() => setGender('W')} className={gender === 'W' ? styles.selectedButton : ''}>여자</button>
            </div>
            <div>
                <button onClick={backBtnClick} className={styles.backButton}>뒤로가기</button>
                <button onClick={insertBtnClick} className={styles.insertButton}>등록하기</button>
            </div>
        </div>
    );
}
