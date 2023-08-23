import { useQuery } from "react-query";
import {Link} from "react-router-dom";
import {styled} from "styled-components";
import {Helmet} from "react-helmet";
import {fetchBoard} from "../api";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  div {
    width: 33%;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 33%;
  button {
    padding: 7px 15px;
    border-radius: 10px;
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const LoginList = styled.ul``;

const Logins = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid white;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  width: 33%;
`;

interface ILogins {
  isSuccess: boolean;
  code: number;
  message: string;
  result: ILogin[];
}

interface ILogin {
  bno: number;
  bName: string;
}

function Login() {
  const { isLoading, data } = useQuery<ILogins>("allBoards", fetchBoard); //파라미터 변경해야 함

  return (
    <Container>
      <Helmet>
        <title>로그인 페이지</title>
      </Helmet>
      <Header>
        <Title>로그인</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <h1>test</h1>
        /*
        <LoginList>
          {data?.result?.map((board) => (
            <Logins key={board.bno}>
              <Link
                to={{
                  pathname: `/board=${board.bno}`,
                  state: { name: board.bName },
                }}
              >
                {board.bName} &rarr;
              </Link>
            </Logins>
          ))}
        </LoginList>*/
      )}
    </Container>
  )
}

export default Login;