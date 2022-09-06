import styled from "styled-components";

const FooterStyled = styled.div`
  background-color: #010b17;
  padding: 2rem;

  .nav {
    ul {
      display: flex;
      list-style: none;
      gap: 1.5rem;
      padding: 0;
      margin: 1rem auto;
      @media (max-width: 767px) {
        & {
          gap: 1rem;
        }
      }
      a {
        text-decoration: none;
        color: #d4d4d4;
        font-size: 1.1rem;
        text-transform: uppercase;
      }
      a:hover {
        color: #fff;
      }
    }
  }

  .media span {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    background-color: #777;
    cursor: pointer;
    svg {
      color: #333;
    }
    &:hover {
      background-color: #fff;
    }
  }

  .copyright {
    align-items: center;
    span {
      color: #d4d4d4;
      text-align: center;
      width: 100%;
      display: block;
      letter-spacing: 2px;
    }
    ul {
      display: flex;
      list-style: none;
      justify-content: space-between;
      align-items: center;
      padding: 0;
      margin: 0;

      li {
        width: 100%;
        height: 40px;
      }
      a {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        color: #fff;
        font-size: 1rem;
      }
      a:hover {
        background-color: #fff;
        color: #333;
      }
    }
  }
  .feedback {
    box-shadow: 0 3px 5px 6px #d4d4d45c;
    border-radius: 6px;
    position: relative;
    z-index: 100;
    .cont {
      border-radius: 6px;
      position: relative;
      margin: 0;
    }
    .feedback_input div {
      border-radius: 4px 0 0 4px;
    }
    .box {
      position: absolute;
      width: 150px;
      height: 150px;
      background-color: yellow;
      /* z-index: 1; */
      @media (max-width: 767px) {
        & {
          display: none;
        }
      }
    }
    .box-1 {
      left: -110px;
      top: -50px;
    }
    .box-2 {
      bottom: -50px;
      right: -110px;
    }

    &::before {
      content: "";
      position: absolute;
      bottom: -50px;
      left: 0;
      width: 400px;
      height: 2px;
      background-color: #777;
      @media (max-width: 767px) {
        & {
          display: none;
        }
      }
    }
  }
`;

export default FooterStyled;
