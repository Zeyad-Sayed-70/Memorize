import styled from "styled-components";

export const PostStyled = styled.div`
  /* @media (min-width: 1278px) {
    & {
      width: calc(100% / 4);
    }
  } */

  .card {
    border-radius: 15px 15px 0 0;
    box-shadow: 1px 1px 5px 1px #00000014;
    min-height: 400px;
  }

  .header {
    overflow: hidden;
    border-radius: 15px 15px 0 0;
    position: relative;
    min-height: 150px;

    img.overview_img {
      min-height: 180px;
      max-height: 300px;
      width: 100%;
      object-fit: cover;
    }

    .head-1 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .creator {
        font-size: 25px;
        font-weight: 400;
      }
      span {
        text-transform: capitalize;
      }
    }

    .moment {
      font-size: 12px;
      margin-top: -10px;
      display: block;
    }

    button {
      color: #fff !important;
    }

    .overlay {
      position: absolute;
      left: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 50%);
      width: 100%;
      height: 100%;
      color: #fff;
      padding: 10px;
    }
  }

  .tags {
    span {
      /* color: #0d6efd; */
      cursor: pointer;
    }
  }

  .title {
    h5 {
      cursor: pointer;
      :hover {
        color: #0069ea;
        text-decoration: underline;
      }
    }
  }

  .description {
    p {
      font-size: 14px;
    }
  }

  .option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;

    button {
      font-size: 12px;
      svg {
        font-size: 20px;
      }
    }
  }
`;
