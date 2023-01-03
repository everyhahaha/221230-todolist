/** @jsxImportSource @emotion/react */
import { jsx, css, Global, ClassNames } from '@emotion/react'
import styled from '@emotion/styled'
import { injectGlobal } from '@emotion/css'
import {useState} from 'react'

injectGlobal`
  body {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    background-color: #e0e0e0;
  }
`
const Title = styled.h1`
  text-align: center;
  font-size: 18px;
`
const Card = styled.div`
  width: 350px;
  height: 500px;
  padding: 24px 24px;
  box-shadow: 0px 10px 16px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  position: relative;
`
const Item = styled.p`
margin: 0;
padding: 8px 16px;
width: 350px;
box-sizing: border-box;
`;
const ItemDelete = styled.button`
  position: absolute;
  bottom: 8px;
  right: 0;
  padding: 4px 8px;
  border-radius: 4px;
  color: white;
  background-color: tomato;
  border: none;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
`


function List(props) {
  return (
    <div style={{
      position: 'relative',
    }}>
      <Item>▪️{props.title}</Item>
      <ItemDelete onClick={e => {
        props.onDelete(props.title);
      }}>
          삭제하기
      </ItemDelete>
    </div>
  )
}

function App() {
  const [data, setData] = useState([]);

  return (
    <>
      <Title>TO DO LIST</Title> 
      <Card>
        <header style={{
          borderBottom: '1.4px solid rgba(0, 0, 0, 0.2)' 
        }}>
          <h2 style={{
            fontSize: '32px', 
          }}>오늘 할 일 <br />
          <span style={{ 
            color: 'tomato'
          }}>{data.length}개</span> 남았어요</h2>
          <p style={{ 
            color: '#909090'
          }}>{new Date().toLocaleDateString()}</p>
        </header>
        <div style={{
          margin: '8px 0',
          height: '280px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0',
          overflow: 'scroll',
        }}>
        {data.map(x => {
          return ( 
            <List 
              title={x}
              onDelete={item => {
                let copy = data.filter(x => x !== item);
                setData(copy);
              }}
            />
          ) 
        })}
        </div>
        <form 
          style={{
            bottom: '24px',
            display: 'flex',
            gap: '4px',
          }}
          onSubmit={e => {
            e.preventDefault();
            setData([...data, e.target[0].value])
        }}>
          <input 
            type="text" 
            placeholder="할 일을 입력해주세요."
            style={{
              padding: '4px 8px',
              border: "none",
              backgroundColor: "#FFEBD8",
              flexGrow: '1',
          }}/>
          <button 
            type='submit'
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              backgroundColor: 'tomato',
              color: '#fff',
              cursor: 'pointer',
            }}
          >등록!</button>
        </form>
      </Card>
    </>
  )
}

export default App;
