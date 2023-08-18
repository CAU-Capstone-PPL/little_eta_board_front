import { Helmet } from "react-helmet";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { styled } from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const MainPost = styled.div`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid white;
`;

const PostUser = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

const PostContent = styled.div`
  font-size: 16px;
  line-height: 1.6;
  padding: 20px;
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  h1 {
    font-size: larger;
    font-weight: 500;
  }
  div {
    font-weight: 300;
  }
`;

const PostCount = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 10px 20px;
  background-color: ${(props) => props.theme.cardBgColor};
  border-radius: 0 0 15px 15px;
  border-top: 1px solid white;
  gap: 15px;
  font-size: 14px;
`;

const Img = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 15px;
  margin: 15px;
`;

const UserDate = styled.div`
  display: flex;
  flex-direction: column;
  h2 {
    font-size: 18px;
    font-weight: 500;
  }
  div {
    font-size: 14px;
  }
`;

const PostLike = styled.div`
  color: red;
`;

const PostComment = styled.div`
  color: skyblue;
`;

interface RouteParams {
  bno: string;
  pno: string;
}

interface RouteState {
  userId: string;
  title: string;
  pContent: string;
  date: string;
  postLikeCount: number;
  replyCount: number;
}
function Post() {
  const params = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const history = useHistory();
  return (
    <Container>
      <Helmet>
        <title>{state.title}</title>
      </Helmet>
      <Header>
        <button
          onClick={() => {
            history.goBack();
          }}
        >
          &larr; back
        </button>
        <Title></Title>
      </Header>
      <MainPost>
        <PostUser>
          <Img src="https://picsum.photos/200/300​" alt="No image" />
          <UserDate>
            <h2>{state.userId}</h2>
            <div>{state.date}</div>
          </UserDate>
        </PostUser>
        <PostContent>
          <h1>{state.title}</h1>
          <div>{state.pContent}</div>
        </PostContent>
        <PostCount>
          <PostLike>좋아요: 12</PostLike>
          <PostComment>댓글 수: 14</PostComment>
        </PostCount>
      </MainPost>
    </Container>
  );
}

export default Post;
