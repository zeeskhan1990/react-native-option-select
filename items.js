import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Text,
  Easing,
  Animated,
} from 'react-native';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const window = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollView: {
    height: 120,
    width: 198 //TODO: this needs to be dynamic
  },
  container: {
    position:'absolute',
    borderColor: '#BDBDC1',
    borderWidth: 1,
    backgroundColor : "#ffffff"
  }
});

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height : new Animated.Value(0)
    };
  }

  updateItemHeight(height) {
    Animated.timing(this.state.height, {
        toValue: height * 2,
        duration: 200,
        easing :  Easing.linear
    }).start();
  }

  componentDidMount() {
    this.updateItemHeight(this.props.height)
  }

  componentWillReceiveProps(nextProps) {
    this.updateItemHeight(nextProps.height)
  }

  render() {
    const { items, positionX, positionY, show, onPress, width, height } = this.props;
    debugger
    if (!show) {
      return null;
    }

    let scrollViewWidth = width - 2;
    let scrollViewHeight = this.state.height;

    const renderedItems = React.Children.map(items, (item) => {
      debugger
      return (
        <TouchableWithoutFeedback onPress={() => onPress(item.props.children, item.props.value) }>
          <View>
            {item}
          </View>
        </TouchableWithoutFeedback>
      );
    });
    debugger
    return (
        <AnimatedScrollView
          style={[styles.container, { top: positionY, left: positionX, width: scrollViewWidth, height: scrollViewHeight }]}
          contentContainerStyle={styles.contentContainer}
          automaticallyAdjustContentInsets={false}
          bounces={false}>
          {renderedItems}
        </AnimatedScrollView>
    );
  }
}

Items.propTypes = {
  positionX: React.PropTypes.number,
  positionY: React.PropTypes.number,
  show: React.PropTypes.bool,
  onPress: React.PropTypes.func
};

Items.defaultProps = {
  width: 0,
  height: 0,
  positionX: 0,
  positionY: 0,
  show: false,
  onPress: () => {}
};

module.exports = Items;
