import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import DowTable from '../Components/DowTable/DowTable';
import DowDetails from '../Components/DowDetails/DowDetails';
import data from './serverFiles/records.json';
import { columns, tableButtons } from './settingFiles/tableSettings'
import detailsProps from './settingFiles/detailsSettings'
import 'antd/dist/antd.css';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

storiesOf('DowTable', module)
  .add('test', () => <DowTable
    dataSource={data}
    columns={columns}
    buttons={tableButtons}
    onRow={record => ({
      onClick: () => {
        console.log(record, 'index.js 31 ');
      }
    })}
  ></DowTable>);
storiesOf('DowDetails', module)
  .add('simple', () => <DowDetails {...detailsProps}></DowDetails>)
