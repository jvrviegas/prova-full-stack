import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    flex-direction: column;
    align-self: center;

    strong {
      color: #fff;
      font-size: 24px;
      margin: 0 15px;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  background: #fff;
  margin-top: 30px;

  form {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 30px;

    label {
      text-align: left;
      display: block;
      font-weight: bold;
      margin: 15px 0 5px;
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

      &::placeholder {
        color: #999;
      }
    }

    button {
      margin: 20px 0 0;
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

    #return {
      background: #ccc;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.07, '#ccc')};
      }
    }
  }
`;
