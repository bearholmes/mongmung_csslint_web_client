import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SYNTAX_OPTIONS } from '@/constants';
import type { SyntaxOption } from '@/types';
import { SyntaxSelector } from './SyntaxSelector';

const meta: Meta<typeof SyntaxSelector> = {
  title: 'UI/SyntaxSelector',
  component: SyntaxSelector,
  tags: ['autodocs'],
  argTypes: {
    onSelectOption: { action: 'select' },
  },
};

export default meta;

type Story = StoryObj<typeof SyntaxSelector>;

export const Default: Story = {
  args: {
    value: 'css',
    label: 'CSS',
    options: SYNTAX_OPTIONS,
  },
  render: (args) => {
    const [currentValue, setCurrentValue] = useState(args.value);
    const selected = SYNTAX_OPTIONS.find((opt) => opt.value === currentValue) ?? SYNTAX_OPTIONS[0];
    const selectedLabel = selected?.label ?? args.label;

    const handleSelect = (option: SyntaxOption) => {
      setCurrentValue(option.value);
      args.onSelectOption?.(option);
    };

    return (
      <div style={{ maxWidth: 320 }}>
        <SyntaxSelector
          {...args}
          value={currentValue}
          label={selectedLabel}
          options={SYNTAX_OPTIONS}
          onSelectOption={handleSelect}
        />
      </div>
    );
  },
};
