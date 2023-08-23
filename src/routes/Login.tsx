import {useMutation} from "react-query";
import {styled} from "styled-components";
import {Helmet} from "react-helmet";
import {login} from "../api";
import {useForm} from "react-hook-form";

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

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  width: 33%;
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

interface ILogin {
  userId: string;
  userPw: string;
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ILogin>();

  const mutation = useMutation((postData: ILogin) => {
    return login(
      {
        userId: postData.userId,
        userPw: postData.userPw
      }
    );
  }, {
    onSuccess: (data) => {
      const token = data.result.jwt;
      localStorage.setItem('token', token);
    },
    onError: (data) => {
      console.log(data);
    }
  });

  const onValid = (data: ILogin) => {
    mutation.mutate(data);
  };

  return (
    <Container>
      <Helmet>
        <title>로그인 페이지</title>
      </Helmet>
      <Header>
        <Title>로그인</Title>
      </Header>
      <WriteForm onSubmit={handleSubmit(onValid)}>
        <Input>
          <label>아이디</label>
          <input
            {...register("userId")}
          />
        </Input>
        <Input>
          <label>비밀번호</label>
          <input
            {...register("userPw")}
          />
        </Input>
        <button>로그인</button>
      </WriteForm>
    </Container>
  )
}

export default Login;