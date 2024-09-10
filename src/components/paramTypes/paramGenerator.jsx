import React from 'react'
import { BasicInput } from './basicInput';
import { Textparam } from './text';
import List from './list';

const paramGenerator = (props) => {
  switch (props.type) {
    case 'integer':
      return <BasicInput key={props.name} type='number' name={props.name} required={props.required} {...props} />
      break;

    case 'string':
      return <BasicInput key={props.name} type='string' name={props.name} required={props.required} {...props} />
      break;

    case 'text':
      return <Textparam key={props.name} name={props.name} required={props.required} {...props} />
      break;

    case 'list':
      return <List key={props.name} name={props.name} required={props.required} {...props} />
      break;

    default: return (<h4 key={props.name} className='text-red-700 my-4'>unimplemented type: <u><b>{props.type}</b></u></h4>);
  }
}

export default paramGenerator

export const paramTypes = {
  // 'integer': ,
  // 'string': ,
  // 'text': ,
  // 'bool': ,
  // 'list': ,
}
