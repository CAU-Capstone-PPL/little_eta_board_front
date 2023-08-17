import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { Helmet } from "react-helmet";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom, isLoginAtom } from "../atoms";
import { fetchBoard } from "../api";

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

const BoardList = styled.ul``;

const Boards = styled.li`
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

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  width: 33%;
`;

interface IBoards {
  isSuccess: boolean;
  code: number;
  message: string;
  result: IBoard[];
}

interface IBoard {
  bno: number;
  bName: string;
}
/*
const boards = {
  isSuccess: true,
  code: 200,
  message: "성공",
  result: [
    {
      bno: 1,
      board_name: "컴공게시판",
    },
    {
      bno: 2,
      board_name: "핫게시판",
    },
  ],
};
*/

function Board() {
  const isLogin = useRecoilValue(isLoginAtom);
  const setIsLogin = useSetRecoilState(isLoginAtom);
  const toggleLoginAtom = () => setIsLogin((prev) => !prev);

  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setIsDark((prev) => !prev);

  const { isLoading, data } = useQuery<IBoards>("allBoards", fetchBoard);

  return (
    <Container>
      <button onClick={toggleLoginAtom}>
        {isLogin ? "로그인 상태" : "로그아웃 상태"}
      </button>
      <Helmet>
        <title>게시판 선택</title>
      </Helmet>
      <Header>
        <div></div>
        <Title>게시판</Title>
        <Buttons>
          <button>{isLogin ? "로그아웃" : "로그인"}</button>
          <button onClick={toggleDarkAtom}>
            {isDark ? "라이트모드" : "다크모드"}
          </button>
        </Buttons>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <BoardList>
          {data?.result?.map((board) => (
            <Boards key={board.bno}>
              <Link
                to={{
                  pathname: `/board=${board.bno}`,
                  state: { name: board.bName },
                }}
              >
                {board.bName} &rarr;
              </Link>
            </Boards>
          ))}
        </BoardList>
      )}
    </Container>
  );
}
export default Board;
