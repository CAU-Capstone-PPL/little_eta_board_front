import { useQuery } from "react-query";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { Helmet } from "react-helmet";
import PostComponent from "../components/PostComponent";
import { fetchPosts } from "../api";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";

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

const Search = styled.form`
  color: ${(props) => props.theme.accentColor};
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
  justify-content: flex-end;
  svg {
    height: 25px;
  }
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding: 5px 10px;
  padding-left: 40px;
  z-index: -1;
  color: white;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.accentColor};
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

interface IForm {
  keyword: string;
}

function Posts() {
  const param = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const { isLoading, data } = useQuery<IPosts>("allPosts", () =>
    fetchPosts(Number(param.bno))
  );
  const history = useHistory();
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = (data: IForm) => {
    history.push(`board=${param.bno}/search?keyword=${data.keyword}`);
  };

  return (
    <Container>
      <Navbar backURL="/" />
      <Helmet>
        <title>{state.name}</title>
      </Helmet>
      <Header>
        <Title>{state.name}</Title>
        <Buttons>
          <button>로그아웃</button>
          <button onClick={() => history.push(`/board=${param.bno}/write`)}>
            글 쓰기
          </button>
        </Buttons>
      </Header>
      <Search onSubmit={handleSubmit(onValid)}>
        <input
          {...register("keyword", {
            required: "키워드를 입력하세요",
            minLength: {
              value: 2,
              message: "키워드는 최소 두 글자 이상이여야합니다.",
            },
          })}
        ></input>
      </Search>
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
