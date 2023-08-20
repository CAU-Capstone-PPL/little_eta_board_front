import { Helmet } from "react-helmet";
import { styled } from "styled-components";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { createPost } from "../api";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const WriteForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  padding: 20px;
  border: 1px solid white;
  gap: 15px;
`;

const Input = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-weight: 400;
  }

  span {
    color: ${(props) => props.theme.accentColor};
  }

  textarea {
    height: 300px;
    resize: vertical;
  }
`;
interface IForm {
  title: string;
  content: string;
}
interface RouteParams {
  bno: string;
}

function Write() {
  const param = useParams<RouteParams>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const mutation = useMutation((postData: IForm) => {
    return createPost(
      {
        userId: "exampleUserId", // Replace with the actual userId
        title: postData.title,
        content: postData.content,
      },
      parseInt(param.bno)
    );
  });
  const history = useHistory();
  const onValid = (data: IForm) => {
    mutation.mutate(data);
    history.goBack();
  };

  return (
    <Container>
      <Helmet>
        <title>글 쓰기</title>
      </Helmet>
      <Header>
        <Title>글 쓰기</Title>
        <button onClick={() => history.goBack()}>&larr; back</button>
      </Header>
      <WriteForm onSubmit={handleSubmit(onValid)}>
        <Input>
          <label>제목</label>
          <input
            style={{ borderColor: errors?.title?.message ? "red" : "" }}
            {...register("title", {
              required: "제목을 입력하세요",
              minLength: {
                value: 2,
                message: "제목은 최소 두 글자 이상이여야합니다.",
              },
            })}
            placeholder="제목을 입력하세요"
          />
          <span>{errors?.title?.message}</span>
        </Input>
        <Input>
          <label>내용</label>
          <textarea
            style={{
              borderColor: errors?.title?.message ? "red" : "",
            }}
            {...register("content", {
              required: "내용을 입력하세요",
              minLength: {
                value: 2,
                message: "내용은 최소 두 글자 이상이여야합니다.",
              },
            })}
            placeholder="내용을 입력하세요"
          />
          <span>{errors?.content?.message}</span>
        </Input>
        <button>글 작성</button>
      </WriteForm>
    </Container>
  );
}

export default Write;
