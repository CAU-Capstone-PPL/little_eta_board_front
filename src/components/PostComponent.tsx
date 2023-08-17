import { Link } from "react-router-dom";
import { styled } from "styled-components";

const Post = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid white;
  padding: 10px 20px;
  &:hover {
    a {
      transition: color 0.2s ease-in;
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
  gap: 4px;
  h1 {
    font-size: 18px;
    font-weight: 700;
  }
  p {
    font-size: 16px;
  }
`;
const PostInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 5px;
`;
const PostInfoElement = styled.div`
  font-size: 14px;
  color: ${(props) => props.color || "white"};
`;

interface IPostComponent {
  bno: number;
  pno: number;
  userId: string;
  title: string;
  pContent: string;
  date: string;
  postLikeCount: number;
  replyCount: number;
}

function PostComponent({
  bno,
  pno,
  userId,
  title,
  pContent,
  date,
  postLikeCount,
  replyCount,
}: IPostComponent) {
  return (
    <Post>
      <Link
        to={{
          pathname: `/board=${bno}/pno=${pno}`,
          state: {
            userId: userId,
            title: title,
            pContent: pContent,
            date: date,
            postLikeCount: postLikeCount,
            replyCount: replyCount,
          },
        }}
      >
        <PostContent>
          <h1>{title}</h1>
          <p>{pContent}</p>
        </PostContent>
        <PostInfo>
          <PostInfoElement color="red">좋아요: {postLikeCount}</PostInfoElement>
          <PostInfoElement color="skyblue">댓글: {replyCount}</PostInfoElement>
          <PostInfoElement color="grey">{date}</PostInfoElement>
          <PostInfoElement color="grey">{userId}</PostInfoElement>
        </PostInfo>
      </Link>
    </Post>
  );
}

export default PostComponent;
