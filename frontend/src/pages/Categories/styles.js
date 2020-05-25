import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    flex-direction: column;
    align-self: center;

    button {
      padding: 10px 20px;
      margin-top: 20px;
      background: #fff;
      border: 0;
      border-radius: 4px;
      font-weight: bold;
      color: #3b4552;
      transition: background 0.2s;

      display: flex;
      align-items: center;

      &:hover {
        background: #e1e1e1;
      }

      svg {
        margin-right: 5px;
      }
    }

    strong {
      color: #fff;
      font-size: 24px;
      margin: 0 15px;
    }
  }

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
    margin-top: 30px;
  }
`;

export const Category = styled.li`
  padding: 10px 20px;
  border-radius: 4px;
  background: #fff;

  opacity: ${(props) => (props.past ? 0.6 : 1)};

  strong {
    display: block;
    color: #3b9eff;
    font-size: 20px;
    font-weight: normal;
  }

  span.description {
    display: block;
    margin-top: 3px;
    font-size: 16px;
    color: #444;
  }

  span {
    display: block;
    margin-top: 6px;
    color: #777;
  }
`;
