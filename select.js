const Option = require('./option');

import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const window = Dimensions.get('window');

const SELECT = 'SELECT';

const styles = StyleSheet.create({
  container: {
    // borderColor: '#BDBDC1',
    // borderWidth: 2 / window.scale
  }
});

class Select extends Component {
  constructor(props) {
    super(props);

    this.pageX = 0;
    this.pageY = 0;
    this.optionListWidth = 0;
    this.optionListHeight = 0;

    let defaultValue = props.defaultValue;

    if (!defaultValue) {
      if (Array.isArray(props.children)) {
        defaultValue = props.children[0].props.children;
      } else {
        defaultValue = props.children.props.children;
      }
    }

    this.state = {
      value: defaultValue
    }
  }

  reset() {
    let { defaultValue } = this.props;
    this.setState({ value: defaultValue });
  }

  _currentPosition(pageX, pageY, optionListWidth, optionListHeight) {
    this.pageX = pageX;
    this.pageY = pageY + optionListHeight;
    debugger
    this.optionListWidth = optionListWidth;
    this.optionListHeight = optionListHeight;
  }

  _onPress() {
    let { optionListRef, children, onSelect, width, height } = this.props;
    if (!children.length) {
      return false;
    }
    optionListRef()._show(children, this.pageX, this.pageY, this.optionListWidth, this.optionListHeight, (item, value=item) => {
      if (item) {
        onSelect(value);
        this.setState({
          value: item
        });
      }
    });
  }

  render() {
    let { width, height, children, defaultValue, style, styleOption, styleText } = this.props;
    let dimensions = { width, height };

    return (
      <TouchableWithoutFeedback onPress={this._onPress.bind(this)}>
        <View ref={SELECT} style={[styles.container, dimensions, style ]}>
          <Option style={ styleOption } styleText={ styleText }>{this.state.value}</Option>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Select.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  optionListRef: React.PropTypes.func.isRequired,
  onSelect: React.PropTypes.func
};

Select.defaultProps = {
  onSelect: () => { }
};

module.exports = Select;
