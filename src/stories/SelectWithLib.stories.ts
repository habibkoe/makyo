
import {Meta, StoryObj} from '@storybook/react'
import SelectWithLib from "../components/SelectWithLib";

const meta:Meta<typeof SelectWithLib> = {
    component: SelectWithLib,
    title: 'Select With Lib'
};

export default meta;

type Story = StoryObj<typeof meta>

export const Select: Story = {}