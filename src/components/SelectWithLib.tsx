import Select from 'react-select'

const SelectWithLib = () => {

    const options = [
        { value: 'option 1', label: 'Option 1' },
        { value: 'option with icon', label: 'Option with icon' },
        { value: 'long long option 3', label: 'Long long option 3' },
        { value: 'long long long option 4', label: 'Long long long option 4' },
        { value: 'long long long long option 5', label: 'Long long long long option 5' },
        { value: 'long long long long long option 6', label: 'Long long long long long option 6' },
      ]

  return (
    <div>
        <Select options={options} isMulti isSearchable />
    </div>
  )
}

export default SelectWithLib