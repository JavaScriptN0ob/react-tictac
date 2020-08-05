import React from 'react';
import style from './square.module.css';

function Square(props) {
  return (
    <button className={style.square} onClick={props.onClick}>
      {props.value}
    </button>
  )
}

export default Square;