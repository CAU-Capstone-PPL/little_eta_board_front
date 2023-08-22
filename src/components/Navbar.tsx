import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  button {
    padding: 7px 15px;
    border-radius: 10px;
  }
`;

interface INavber {
  backURL: string;
}

function Navbar({ backURL }: INavber) {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setIsDark((prev) => !prev);
  return (
    <Container>
      <Header>
        <Link to={backURL}>&larr; back</Link>
        <button onClick={toggleDarkAtom}>
          {isDark ? "라이트모드" : "다크모드"}
        </button>
      </Header>
    </Container>
  );
}

export default Navbar;
