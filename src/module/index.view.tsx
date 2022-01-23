import * as React from 'react';
import { Button, message } from '@opensumi/ide-components';
import { ConfigProvider, Input, Switch } from 'antd';

export const TestView = () => {
  return <ConfigProvider prefixCls="sumi_antd">
    <Input placeholder="Basic usage" />
    <Switch defaultChecked checkedChildren="open" />
  </ConfigProvider>
};

export const TestView2 = (props: {name: string}) => {
  return <div>
    <Button onClick={() => message.success('hello!')}>Hello {props.name}</Button>
  </div>
};