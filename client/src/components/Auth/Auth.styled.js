import styled from "styled-components";

const AuthStyled = styled.div`
  p {
    color: red;
  }
  .passFeild {
    position: relative;

    .passType {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      color: gray;
      width: 41px;
      height: 54px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export default AuthStyled;
