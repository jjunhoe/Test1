import { useState } from 'react';
import styles from './css/Registser.module.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
    const [id, setId] = useState('');
    const [isIdValid, setIsIdValid] = useState(true);
    const [isChecking, setIsChecking] = useState(false);
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [nick, setNick] = useState('');
    const [birthday, setBirthday] = useState('');
    const [address, setAddress] = useState('');
    const [addressInfo, setAddressInfo] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [nationality, setNationality] = useState('');
    const [showAddressFields, setShowAddressFields] = useState(false); // 주소 입력 필드 표시 여부
    const navigate = useNavigate();

    const handleIdChange = async (e) => {
        const newId = e.target.value;
        setId(newId);

        if (newId) {
            setIsChecking(true);
            try {
                const response = await axios.post('http://localhost:9498/user/check', {
                    userId: newId,
                });
                if (response.data.exists) {
                    setIsIdValid(false);
                } else {
                    setIsIdValid(true);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsChecking(false);
            }
        } else {
            setIsIdValid(true);
        }
    };

    const insertBtnClick = async (e) => {

        if (!id || !password || !name || !nick || !birthday || !address || !gender || !nationality) {
            alert('모든 필수 항목을 입력해주세요.');
            return;
        }

        try {
            const fullAddress = `${address} ${addressInfo}`; // 주소와 상세주소를 합침

            const response = await axios.post('http://localhost:9498/user/register', {
                userId: id,
                userPassword: password,
                userName: name,
                userNick: nick,
                userBirthday: birthday,
                userAddress: fullAddress, // 합친 주소를 서버로 전송
                userGender: gender,
                userNationality: nationality
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
            <div className={styles.registerInputContainerNo1}>
                <Link to='/main' className={styles.titleLink}>대준수산</Link>
                <div className={styles.inputWithMessageContainer}>
                    {/* 중복 확인 메시지 */}
                    <div className={styles.duplicationContainer}>
                        {!isIdValid && <p className={styles.duplocationText}>이미 사용 중</p>}
                        {isIdValid && id && !isChecking && <p className={styles.successText}>사용 가능</p>}
                        {isChecking && <p className={styles.duplocationText}>확인 중...</p>}
                    </div>
                    {/* 아이디 입력 필드 */}
                    <input
                        type="text"
                        placeholder="아이디"
                        className={styles.registerInput}
                        value={id}
                        onChange={handleIdChange}
                    />
                </div><input type="password" placeholder="비밀번호" className={styles.registerPasswdInput} value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className={styles.registerInputContainerNo2}>
                <input type="text" placeholder='이름' className={styles.registerNameInput} value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="닉네임" className={styles.registerNickInput} value={nick} onChange={(e) => setNick(e.target.value)} />
                <input type="text" placeholder="생년월일 8자리" className={styles.registerBirthdayInput} value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                <div className={styles.selectContainer}>
                    <div className={styles.genderContainer}>
                        <button onClick={() => setGender('M')} className={styles.genderMButton}>남자</button>
                        <button onClick={() => setGender('W')} className={styles.genderWButton}>여자</button>
                    </div>
                    <div className={styles.nationalityContainer}>
                        <button onClick={() => setNationality('L')} className={styles.nationalityLButton}>내국인</button>
                        <button onClick={() => setNationality('F')} className={styles.nationalityFButton}>외국인</button>
                    </div>
                </div>
                <div className={styles.registerInputContainerNo3}>
                    <select className={styles.newsAgencyContainer}>
                        <option>선택</option>
                        <option>SKT</option>
                        <option>LG U+</option>
                        <option>KT</option>
                        <option>알뜰폰</option>
                    </select>
                    <input type="text" placeholder='전화번호' className={styles.phoneInput} value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
            </div>
            <div className={styles.addressContainer}>
                {!showAddressFields && ( // 주소찾기 버튼 표시
                    <button onClick={findBtnClick} className={styles.findAddress}>주소찾기</button>
                )}
                {showAddressFields && ( // 주소 및 상세주소 입력 필드 표시
                    <div className={styles.AddressContainer}>
                        <input type='text' placeholder='주소' className={styles.addressInput} value={address} readOnly />
                        <input type='text' placeholder='상세주소' className={styles.addressParticularInput} value={addressInfo} onChange={(e) => setAddressInfo(e.target.value)} />
                    </div>
                )}
            </div>

            <div className={styles.buttonContainer}>
                <button onClick={insertBtnClick} className={styles.insertButton}>등록</button>
            </div>
        </div>
    );
}
