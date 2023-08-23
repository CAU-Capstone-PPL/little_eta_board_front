import React, {JSX} from 'react';
import {useRecoilState} from "recoil";
import {isLoginAtom, userIdAtom, userNameAtom} from "../atoms";
import {styled} from "styled-components";
import {useHistory} from "react-router-dom";

interface LoginStatus {
  userId: string | null;
  userName: string | null;
  logout: () => void;
}

const UserInfoStyle = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const UserStatus = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
`;

const UserStatusElement = styled.span`
  font-size: 14px;
`;

function LoginBar(props: LoginStatus) {
  return <UserInfoStyle>
    <button type="button" onClick={(event) => {
      props.logout();
    }}>로그아웃</button>
    <UserStatus>
      <UserStatusElement>아이디: {props.userId}, </UserStatusElement>
      <UserStatusElement>닉네임: {props.userName}</UserStatusElement>
    </UserStatus>
  </UserInfoStyle>
}

function LogoutBar() {
  const history = useHistory();

  return <UserInfoStyle>
    <button type="button" onClick={() => {
      history.push('/user/login');
    }}>로그인</button>
  </UserInfoStyle>
}

function UserInfo() {
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const [userId, setUserId] = useRecoilState(userIdAtom);
  const [userName, setUserName] = useRecoilState(userNameAtom);

  let component = null;

  if(isLogin) {
    component = <LoginBar userId={userId} userName={userName} logout={() => {
      localStorage.removeItem('token');
      setUserId(null);
      setUserName(null);
      setIsLogin(false);
    }}></LoginBar>
  } else {
    component = <LogoutBar></LogoutBar>
  }

  return (
    <React.Fragment>
      {component}
    </React.Fragment>
  );
}

export default UserInfo;