import styled from "styled-components";

const LayoutStyled = styled.div`
  @media (max-width: 991px) {
    .content {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column-reverse;

      .form {
        margin: 0 auto 3rem;
        @media (max-width: 872px) {
          & > div,
          & > form {
            width: 100%;
          }
        }
      }
      @media (max-width: 991px) {
        .form {
          gap: 20px;
          width: 100%;
          flex-direction: row-reverse;
          margin: 0;
          margin-bottom: 1rem;
          display: flex;
          justify-content: space-between;
        }
        @media (max-width: 767px) {
          .form {
            gap: 20px;
            width: 100%;
            flex-direction: column;
            margin: 0;
            margin-bottom: 1rem;
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }
  }
  .pagination {
    background-color: #eeeeee;
    box-shadow: 1px 1px 5px 1px #33333338;
  }
`;

export default LayoutStyled;
