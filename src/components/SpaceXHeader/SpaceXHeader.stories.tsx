import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';

import SpaceXHeader, { ISpaceXHeaderProps } from './SpaceXHeader';

export default {
  title: 'Components/SpaceXHeader',
  component: SpaceXHeader,
} as Meta;

const Template: Story<ISpaceXHeaderProps> = (args) => <SpaceXHeader {...args} />;

export const WithButton = Template.bind({});
WithButton.args = {
  hasStatistics: true,
  handleShowStatisticsModal: () => {}
};
WithButton.decorators = [(Story) => <div style={{ backgroundColor: 'black' }}><Story/></div>]

export const NoButton = Template.bind({});
NoButton.args = {
  hasStatistics: false,
  handleShowStatisticsModal: () => {}
};
NoButton.decorators = [(Story) => <div style={{ backgroundColor: 'black' }}><Story/></div>]
