import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Radio from './index';
import Textbox from '../TextBox';

const meta: Meta = {
  title: 'Makers Template/Atoms/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: ['blue', 'green'],
      },
      description: 'Color del Radio button.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Radio>;

export const Primary: Story = (args) => {
  const [selectedValue, setSelectedValue] = useState('');
  

  const handleSelectedValueChange = (value: string) => {
    setSelectedValue(value);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
  };
  
  return (
    <>
      <Radio {...args} label="Option 1" value="value1" selectedValue={selectedValue} setSelectedValue={handleSelectedValueChange} />
      <Radio {...args} label="Option 2" value="value2" selectedValue={selectedValue} setSelectedValue={handleSelectedValueChange} />
      <p>Selected Value: {selectedValue}</p>
      <Textbox label="Textbox Label" placeholder="Enter text" color="primary" value={selectedValue} onSearch={handleSearch} /> {/* Muestra el Textbox */}
    </>
  );
};
Primary.args = {
  color: 'blue',
};




