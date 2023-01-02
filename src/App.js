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
`
const Item = styled.div`

`
// function Item(props) {

//   return (
//     <>
//       <h3>{props.title}</h3> 
//     </>
//   )
// }

function List(props) {

  return (
    <div style={{
      height: '50px',
    }}>
      <h3>{props.title}</h3>
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
        {data.map(x => <List title={x}/>)}
        <form onSubmit={e => {
          e.preventDefault();
          setData([...data, e.target[0].value])
        }}>
          <input 
            type="text" 
            placeholder="할 일을 입력해주세요."
            style={{
              bottom: '0',
            
              padding: '4px 8px',
              bottom: '0px',
              border: "none",
              backgroundColor: "#FFEBD8",
          }}/>
          <button 
            type='submit'
            style={{
              padding: '4px 8px',
              border: 'none',
              borderRadius: '4px',
              backgroundColor: 'tomato',
              color: '#fff',
            }}
          >등록!</button>
        </form>
      </Card>
    </>
  )
}

export default App;
