import React from 'react'
import { BasicInput } from './basicInput';
import { Textparam } from './text';
import List from './list';

const paramGenerator = (props) => {
  switch (props.type) {
    case 'integer':
      return <BasicInput type='number' name={props.name} required={props.required} />
      break;

    case 'string':
      return <BasicInput type='string' name={props.name} required={props.required} />
      break;

    case 'text':
      return <Textparam name={props.name} required={props.required} />
      break;

      case 'list':
        return <List name={props.name} required={props.required} {...props} />
        break;

    default: return (<h4 className='text-red-700 my-4'>unimplemented type: <u><b>{props.type}</b></u></h4>);
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
