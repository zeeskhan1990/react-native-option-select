# React Native Option Select
A simple DropDown menu for React Native App! 

## Introduction

React Native Option Select is simple, customizable and easy to use dropdown in React Native with a material outlook and plays well with the flex layout of the rest of the application. 

## Installation
```
npm i react-native-option-select --save
```

## Usage
Require it inside your Javascript files. Also supporting components using object-deconstructing. 
```Select``` ```Option``` ```OptionList```.

```<OptionList />``` is to be used to append the options. This has to be placed as a last component so that it take the highest Z-Index.

## Example

```jsx
import React, {
  Component,
  AppRegistry,
  Text,
  View,
} from 'react-native';

import DropDown, {
  Select,
  Option,
  OptionList,
} from 'react-native-option-select';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canada: ''
    };
  }

  _getOptionList() {
    return this.refs['OPTIONLIST'];
  }

  
  _canada(province) {

  this.setState({
      ...this.state,
      canada: province
    });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Select
            width={250}
            optionListRef={this._getOptionList.bind(this)}
            defaultValue="Select a Province in Canada ..."
            onSelect={this._canada.bind(this)}>
            <Option value = {{id : "alberta"}}>Alberta</Option>
            <Option>British Columbia</Option>
            <Option>Manitoba</Option>
            <Option>New Brunswick</Option>
            <Option>Newfoundland and Labrador</Option>
            <Option>Northwest Territories</Option>
            <Option>Nova Scotia</Option>
            <Option>Nunavut</Option>
            <Option>Ontario</Option>
            <Option>Prince Edward Island</Option>
            <Option>Quebec</Option>
            <Option>Saskatchewan</Option>
            <Option>Yukon</Option>
          </Select>

          <Text>Selected Canada's province: {this.state.canada}</Text>
          
          <OptionList ref="OPTIONLIST"/>
      </View>
    );
  }
}

AppRegistry.registerComponent('App', () => App);


```

### Configuration

##### Select:
| Property | Type | Default | Description | Mandatory
|---------------|----------|--------------|----------------------------------------------------------------|
| width | number | 400 | Width of the selection | No
| onSelect | function(text, value) | null | function to be invoked when option is selected | Yes
| height | number | 50 | Height of the selection | No
| optionListRef | function | required | Reference to ```<OptionList />``` to display the selection menu | Yes
| style | object | null | Custom styles to be applied to the select container element if supplied | No
| styleOption | object | null | Custom styles to be applied to the option element displayed on select if supplied | No
| styleText | object | null | Custom styles to be applied to the text of the option element displayed on select if supplied | No
| defaultValue | string | first option | The value to be displayed if none of the options are selected. | Yes

##### Option:

| Property | Type | Default | Description | Mandatory
|-----------|--------|---------|--------------------------------------------|
| value | any |  null | value will be passed on callback `onSelect` as second argument  | yes
| style | object | null | Styles to be applied on 'Option' component | No
| styleText | object |  null | Styles to be applied on text inside of 'Option'  | No


##### OptionList:

| Property | Type | Default | Description | Mandatory
|-----------|--------|---------|--------------------------------------------|
| overlayStyles | object | null | Styles to be applied on 'overlay' backdrop | No
| useSelectHeight | object | null | If set to true, then each option element will take height equal to the height of the select element on the opening of the dropdown | No


## Demo
#####  IOS and Android:
To be attached

## Contributions
Please feel free to contribute. (✿◠‿◠)
