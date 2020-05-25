import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #3b9eff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 450px;
  text-align: center;
  background: #fff;
  border-radius: 4px;
  padding: 40px 30px;

  img {
    width: 120px;
    height: 120px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    align-items: stretch;

    label {
      text-align: left;
      display: block;
      font-weight: bold;
      margin: 5px 0 5px;
      text-transform: uppercase;
      font-size: 13px;
      color: #333;
    }

    input {
      border: 1px solid #eee;
      border-radius: 4px;
      height: 40px;
      padding: 0 15px;
      color: #333;
      margin: 0 0 10px;

      &::placeholder {
        color: #999;
      }
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #3b9eff;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.05, '#3b9eff')};
      }
    }

    a {
      color: #3b4552;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
