import {styled} from "styled-components";
import {Helmet} from "react-helmet";
import {useForm} from "react-hook-form";
import {useMutation} from "react-query";
import {duplicateCheck, login, signUp} from "../api";
import {useState} from "react";
import {useHistory} from "react-router-dom";

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

interface ISignUp {
  userId: string;
  userPw: string;
  userName: string;
}

function SignUp() {
  const [userId, setUserId] = useState("");
  const [duplicateStatus, setDuplicateStatus] = useState(true);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ISignUp>();

  const mutation = useMutation((postData: ISignUp) => {
    return signUp(
      {
        userId: postData.userId,
        userPw: postData.userPw,
        userName: postData.userName
      }
    );
  }, {
    onSuccess: () => {
      history.push(`/user/login`);
    }
  });
  const onValid = (data: ISignUp) => {
    mutation.mutate(data);
  };


  const duplicateCheckMutation = useMutation((postData: string) => {
    return duplicateCheck(
      {
        userId: postData
      }
    );
  }, {
    onSuccess: (data) => {
      if(data.result.duplicate) {
        setDuplicateStatus(true);
        console.log("duplicate");
      } else {
        setDuplicateStatus(false);
        console.log("not duplicate");
      }
    },
    onError: (data) => {
      console.log(data);
    }
  });
  const handleDuplicate = () => {
    console.log("test");
    duplicateCheckMutation.mutate(userId);
  };

  let componentButton = null;
  if(duplicateStatus) {
    componentButton = <button type="button" onClick={handleDuplicate}>중복검사</button>
  } else {
    componentButton = <button type="submit">회원가입</button>
  }

  return (
    <Container>
      <Helmet>
        <title>회원가입</title>
      </Helmet>
      <Header>
        <Title>회원가입</Title>
      </Header>
      <WriteForm onSubmit={handleSubmit(onValid)}>
        <Input>
          <label>아이디</label>
          <input
            {...register("userId")}
            onChange={(event) => {
              setUserId(event.target.value);
              setDuplicateStatus(true);
            }}
          />
        </Input>
        <Input>
          <label>비밀번호</label>
          <input
            {...register("userPw")}
          />
        </Input>
        <Input>
          <label>닉네임</label>
          <input
            {...register("userName")}
          />
        </Input>
        {componentButton}
      </WriteForm>
    </Container>
  );
}

export default SignUp;