import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faKey,
  faRightToBracket,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import RutilVmLogo from "../../components/common/RutilVmLogo";
import Background from "../../components/common/Background";
import IconInput from "../../components/Input/IconInput";
import { useAuthenticate } from "../../api/RQHook";
import "./Login.css";

const Login = ({ setAuthenticated, setUsernameGlobal }) => {
  // 모달 관련 상태 및 함수
  const [activePopup, setActivePopup] = useState(null);
  const openPopup = (popupType) => setActivePopup(popupType);
  const closePopup = () => setActivePopup(null);
  const navigate = useNavigate();

  // 사용자 정보
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const {
    data: res,
    status: authStatus,
    isError: isAuthError,
    isSuccess: isAuthSuccess,
    error: authError,
    isLoading: isAuthLoading,
    mutate: authMutate,
  } = useAuthenticate(username, password);

  const doLogin = (e) => {
    e.preventDefault();
    authMutate({ username, password }, {
      onSuccess: (res) => {
        console.log(res);
        if (!res) {
          // 로그인 실패
          toast.error("실패: 로그인 정보가 일지하지 않습니다.");
          return;
        }
        if (localStorage[`token`]) {
          
        }
        // 토큰 찾아 집어 넣은 후
        setAuthenticated(true);
        localStorage.setItem("username", username);
        navigate("/");
      },
      onError: (err) => {
        toast.error("로그인에 실패했습니다. 잠시 후 다시 시도해주세요.");
      },
    }
  )};

  return (
    <Background id="login" children={
      <div className="login-container">
        <RutilVmLogo className="bigger" description="RutilVM에 오신걸 환영합니다." />
        <form className="flex flex-col justify-center items-center" 
          onSubmit={doLogin}>
          <IconInput
            className="login-input text-lg"
            required
            icon={faUser}
            type="text"
            placeholder="사용자명"
            value={username ?? ""}
            onChange={(e) => {
              console.log("Username:", e.target.value); // 확인용 로그
              setUsername(e.target.value);
            }}
          />
          <IconInput
            className="login-input text-lg"
            required
            icon={faKey}
            type="password"
            placeholder="비밀번호"
            value={password ?? ""}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="login-button bgcolor-primary"
            disabled={isAuthLoading}
          >
            {isAuthLoading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} fixedWidth />
                &nbsp;로그인 중...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faRightToBracket} fixedWidth />
                &nbsp;로그인
              </>
            )}
          </button>
        </form>
      </div>
      }>
    </Background>
  );
};

export default Login;
