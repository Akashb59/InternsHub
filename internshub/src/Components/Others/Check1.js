import React from 'react';
import Select from 'react-select';
//import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

class App extends React.Component {
  state = {
    selectedOption: null
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        isMulti
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}
export default App;
