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
  padding: 4px 12px;
  width: 350px;
  box-sizing: border-box;
`
const ItemButton = styled.button`
  width: 3.2rem;
  margin: 4px 0;
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
  let [editMode, setEditMode] = useState(false);
  const [newWord, setNewWord] = useState(null);
  const [oldWord, setOldWord] = useState(null);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
    }}>
      {editMode ? 
        <input 
          placeholder={oldWord}
          onChange={e => {
            setNewWord(e.target.value)
        }}></input> : <Item>{props.title}</Item>}
        <div style={{
          display: 'flex',
          gap: '4px',
        }}>
          {!editMode? (
            <ItemButton 
              onClick={() => {
                setOldWord(props.title);
                setEditMode(!editMode);
              }}> 편집
            </ItemButton> 
          ) : (
            <ItemButton 
              onClick={() => {
                props.onEdit(newWord);
                setEditMode(!editMode);
              }}>
                저장
            </ItemButton>
          )}
          <ItemButton 
            onClick={() => {
              props.onDelete(props.title);
          }}>
            삭제
          </ItemButton>
        </div>
    </div>
  )
}
/** 만약 할일이 중복된다면 같이 삭제되어 버리는 오류 발생 */

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
        {data.map((x, i )=> {
          return ( 
            <List 
              title={x}
              onDelete={listItem => {
                let copy = data.filter(x => x !== listItem);
                setData(copy);
              }}
              onEdit={(newWord) => {
                let copy = data;
                copy[i] = newWord;
                setData(copy);
                console.log(data);
              }}
              data={data}
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
            setData([...data, e.target[0].value]);
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
