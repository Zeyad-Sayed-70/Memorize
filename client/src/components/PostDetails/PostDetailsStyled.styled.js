import styled from "styled-components";

const PostDetailsStyled = styled.div`
  .content {
    align-items: center;
    flex-wrap: wrap;
    flex-direction: column-reverse;
    margin-top: 3rem;
    padding: 1rem;
    background-color: #fff;
    box-shadow: 0 0 5px 5px #58585830;
  }
  @media (min-width: 1200px) {
    .content {
      flex-direction: row;
    }
    .info-side,
    .img-side {
      width: 50%;
      padding: 1rem !important;
    }
  }
  img {
    max-height: 500px;
    object-fit: cover;
  }
  .recommends {
    @media (max-width: 1199px) {
      order: -1;
    }
    .card {
      h6 {
        cursor: pointer;
        margin: 0.5rem 0;
      }
      h6:hover {
        color: blue;
        text-decoration: underline;
      }
      .img-content {
        min-height: 150px;
        max-height: 250px;
        img {
          object-fit: cover;
        }
      }
    }
  }
`;

export default PostDetailsStyled;
