import { styled } from "styled-components";

const Reply = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid white;
  padding: 10px 20px;
`;

const ReplyContent = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  h2 {
    font-size: 16px;
    font-weight: 500;
  }
  p {
    font-size: 16px;
  }
`;
const ReplyInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 5px;
  button {
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
  }
`;
const ReplyInfoElement = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.textColor};
`;

function ReplyComponent() {
  return (
    <Reply>
      <ReplyContent>
        <h2>이름</h2>
        <p>댓글 내용</p>
        <ReplyInfo>
          <ReplyInfoElement>날짜</ReplyInfoElement>
          <ReplyInfoElement>좋아요개수</ReplyInfoElement>
          <ReplyInfoElement as="button">좋아요</ReplyInfoElement>
        </ReplyInfo>
      </ReplyContent>
    </Reply>
  );
}
export default ReplyComponent;
