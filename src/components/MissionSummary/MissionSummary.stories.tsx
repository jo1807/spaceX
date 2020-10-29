import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { MissionSummary } from './index';
import Rocket from '../../images/rocket.jpg';

export default {
  title: 'Components/MissionSummary',
  component: MissionSummary,
} as Meta;

const Template: Story<any> = (args) => <MissionSummary {...args} />;

export const Default = Template.bind({});
Default.args = {
  missionName: 'DSCOVR',
  flightNumber: 12455,
  rocketName: 'Falcon 9',
  missionDate: '12-02-20',
  currentId: 0,
  launchId: 12345,
  launchLogo: Rocket,
  setToggleShowModal: () => {}
};
Default.decorators = [(Story) => {
  return (
    <div style={{ backgroundColor: 'black' }}>
      <div style={{ width: '500px', alignSelf: 'center' }}>
        <Story/>
      </div>
    </div>
  )
}]


//render all info
//on click mock fn is called