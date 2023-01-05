/** @jsxImportSource @emotion/react */
import { jsx, Global, ClassNames, keyframes } from '@emotion/react'
import { css } from '@emotion/css'
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
  text-align: left;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.4);
  letter-spacing: -0.02rem;
`
const Card = styled.div`
  width: 350px;
  box-shadow: 0px 10px 16px rgba(0, 0, 0, 0.2);
  background-color: tomato;
  position: relative;
`
// const InputAni = keyframes`
//   0% {
//     left: -600px;
//   }
//   to {
//     left: 600px;
//   }
// `;
const Item = styled.p`
  margin-top: 2px;
  width: 200px;
  position: absolute;
  fontSize: 16px;
  `
  // animation: ${InputAni} 200ms ease-in-out linear;
const ItemButton = styled.button`
  width: 2.6rem;
  margin-bottom: 8px;
  padding: 6px 0;
  border-radius: 2px;
  color: white;
  background-color: tomato;
  opacity: 0.5;
  border: none;
  transition: all 250ms ease;
  &:hover {
    opacity: 1;
  }
`
const ListEditInput = styled.div`
  overflow: hidden;
  position: absolute;
  margin-top: 2px;

  .underline-animation {
    display: inline-block;
    position: absolute;
    margine: 0;
    bottom: 0;
    left: -224px;
    width: 224px;
    height: 1.6px;
    z-index: 2;
    background-color: tomato;
    transition: all 200ms ease;
  }

  input {
    position: relative;
    width: 200px;
    left: -2px;
    font-size: 16px;
    letter-spacing: 0.05rem;
    border: none;
    border-bottom: 1.6px solid #b0b0b0;
    
    &:focus {
      outline: none;
    }
    &:focus + .underline-animation {
      left: 0;
    }
  }
`

function List(props) {
  let [editMode, setEditMode] = useState(false);
  const [newWord, setNewWord] = useState('');
  const [oldWord, setOldWord] = useState('');

  return (
    <div>
      {editMode ? 
        <ListEditInput>
          <input 
          value={!newWord ? oldWord : newWord}
          onChange={e => {
            setNewWord(e.target.value);
            console.log(newWord);
          }}
          ></input><span className='underline-animation'></span>
        </ListEditInput> : <Item>{props.title}</Item>}
        <div className={css`
          display: flex;
          gap: 6px;
          justify-content: flex-end;
        `}>
          {!editMode ? (
            <ItemButton 
              onClick={() => {
                setOldWord(props.title);
                setEditMode(!editMode);
              }}> 수정
            </ItemButton> 
          ) : (
            <ItemButton 
              onClick={() => {
                setEditMode(!editMode);
                props.onEdit(newWord);
                setNewWord(null);
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
      <Title>{new Date().toLocaleDateString()}</Title> 
      <Card>
        <header className={css`
          position: relative;
          display: inline-block;
          margin: 12px 24px 0 24px;
        `}>
          <h2 className={css`
            font-size: 32px;
            color: #fff;
          `}>오늘 할 일 <br />
          <span style={{ 
            color: '#000'
          }}>{data.length}개</span> 남았어요</h2>
        </header>
        <div className={css`
          padding: 12px;
          height: 280px;
          display: flex;
          flex-direction: column;
          gap: 0;
          overflow: scroll;
          background-color: #fff;
        `}>
        {data.map((x, i )=> {
          return ( 
            <List 
              title={x}
              data={data}
              onDelete={listItem => {
                let copy = data.filter(x => x !== listItem);
                setData(copy);
              }}
              onEdit={newWord => {
                data[i] = newWord;
                let copy = [...data];
                setData(copy);
                console.log(data);
              }}
            />
          ) 
        })}
        </div>
        <form 
          className={css`
            padding: 12px;
            display: flex;
            gap: 4px;
            background-color: #fff;
          `}
          onSubmit={e => {
            e.preventDefault();
            setData([...data, e.target[0].value]);
            e.target[0].value = '';
        }}>
          <input 
            type="text" 
            placeholder="할 일을 입력해주세요."
            className={css`
              padding: 4px 8px;
              border: none;
              background-color: #FFEBD8;
              flex-grow: 1;
              &:focus {
                outline: none;
              },
          `}/>
          <button 
            type='submit'
            className={css`
              padding: 6px 10px;
              border: 1px solid tomato;
              border-radius: 2px;
              color: tomato;
              font-size: 14px;
              font-weight: 700;
              cursor: pointer;
              transition: all 250ms ease;
              &:hover {
                color: #fff;
                background-color: tomato;
              }
            `}
          >등록!</button>
        </form>
      </Card>
    </>
  )
}

export default App;
