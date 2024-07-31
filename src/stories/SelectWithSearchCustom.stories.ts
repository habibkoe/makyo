import { Meta, StoryObj } from "@storybook/react";
import SelectWithSearchCustom from "../components/SelectWithSearchCustom";

const meta: Meta<typeof SelectWithSearchCustom> = {
  component: SelectWithSearchCustom,
  title: "Select With Search",
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Select: Story = {
  args: {
    datas: [{
      "value": "option 1 Test Lagi",
      "label": "Option 1 Test Lagi"
    }, {
      "value": "option with icon",
      "label": "Option with icon"
    }, {
      "value": "long long option 3",
      "label": "Long long option 3"
    }, {
      "value": "long long long option 4",
      "label": "Long long long option 4"
    }, {
      "value": "long long long long option 5",
      "label": "Long long long long option 5"
    }, {
      "value": "long long long long long option 6",
      "label": "Long long long long long option 6"
    }],

    withSearch: true,
    multiple: true,
    outlined: true,
    id: "dd-1",
    optionLabel: "Search Here",
    placeholder: "Seach data...",
    onSelect: () => console.log("test data")
  },
};
