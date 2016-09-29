const Option = require('./option');

import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  NativeModules,
  findNodeHandle
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

  _onPress() {
    let { optionListRef, children, onSelect, width, height } = this.props;
    if (!children.length) {
      return false;
    }
    let handle = findNodeHandle(this)
    let that = this;
    NativeModules.UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
        optionListRef()._show(children, pageX, pageY + height, width, height, (item, value=item) => {
          if (item) {
            onSelect(value);
            that.setState({
              value: item
            });
          }
        });
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
