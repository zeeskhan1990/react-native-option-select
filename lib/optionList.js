const Overlay = require('./overlay');
const Items = require('./items');

import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  NativeModules,
  findNodeHandle
} from 'react-native';

const window = Dimensions.get('window');

class OptionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,

      width: 0,
      height: 0,

      pageX: 0,
      pageY: 0,

      positionX: 0,
      positionY: 0,

      items: [],
      onSelect: () => { }
    };
  }

  _show(items, positionX, positionY, currentWidth, currentHeight, onSelect) {
    let handle = findNodeHandle(this);
    let that = this;
    NativeModules.UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
        positionX = positionX - pageX;
        positionY = positionY - pageY;
        that.setState({
          ...that.state,
          positionX,
          positionY,
          pageX,
          pageY,
          width : currentWidth,
          height : currentHeight,
          items,
          onSelect,
          show: true
        });
    });
  }

  _onOverlayPress() {
    let { onSelect } = this.state;
    onSelect(null, null);

    this.setState({
      ...this.state,
      show: false
    });
  }

  _onItemPress(item, value) {
    let { onSelect } = this.state;
    onSelect(item, value);

    this.setState({
      ...this.state,
      show: false
    });
  }

  render() {
    let {
      items,
      pageX,
      pageY,
      positionX,
      positionY,
      width,
      height,
      show
    } = this.state;
    let {
      overlayStyles,
      useSelectHeight
    } = this.props;
    return (
      <View>
        <Overlay
          pageX={pageX}
          pageY={pageY}
          show={show}
          onPress={ this._onOverlayPress.bind(this) }
          overlayStyles = {overlayStyles} />
        <Items
          items={items}
          positionX={positionX}
          positionY={positionY}
          width={width}
          height={height}
          show={show}
          useSelectHeight={useSelectHeight}
          onPress={ this._onItemPress.bind(this) }/>
      </View>
    );
  }
}

OptionList.propTypes = {

};

OptionList.defaultProps = {

};

module.exports = OptionList;
