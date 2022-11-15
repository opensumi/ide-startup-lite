import * as React from 'react';
import { Button, message } from '@opensumi/ide-components';

export const TestView = (props: {name: string}) => {
  return <div>
    <Button onClick={() => message.success('hello!')}>Hello {props.name}</Button>
  </div>
};