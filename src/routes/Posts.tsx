import { useQuery } from "react-query";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { Helmet } from "react-helmet";
import PostComponent from "../components/PostComponent";
import { fetchPosts } from "../api";

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
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

interface IPosts {
  isSuccess: boolean;
  code: number;
  message: string;
  result: IPost[];
}

interface IPost {
  pno: number;
  bno: number;
  title: string;
  userId: string;
  pContent: string;
  date: string;
  replyCount: number;
  likeCount: number;
}

interface RouteState {
  name: string;
}
interface RouteParams {
  bno: string;
}

function Posts() {
  const param = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const { isLoading, data } = useQuery<IPosts>("allPosts", () =>
    fetchPosts(Number(param.bno))
  );
  const history = useHistory();

  return (
    <Container>
      <Helmet>
        <title>{state.name}</title>
      </Helmet>
      <Header>
        <Link to="/">&larr; back</Link>
        <Title>{state.name}</Title>
        <Buttons>
          <button>로그아웃</button>
          <button>글 검색</button>
          <button onClick={() => history.push(`/board=${param.bno}/write`)}>
            글 쓰기
          </button>
        </Buttons>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <PostList>
          {data?.result.map((post) => (
            <PostComponent
              key={post.pno}
              bno={post.bno}
              pno={post.pno}
              userId={post.userId}
              title={post.title}
              pContent={post.pContent}
              date={post.date}
              likeCount={post.likeCount}
              replyCount={post.replyCount}
            ></PostComponent>
          ))}
        </PostList>
      )}
    </Container>
  );
}
export default Posts;
