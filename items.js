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
    width: 128 //TODO: this needs to be dynamic
  },
  container: {
    position:'absolute',
    borderColor: '#BDBDC1',
    borderWidth: 1,
    backgroundColor : "#ffffff"
  },
  shadow: {
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0
    }
  }
});

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height : new Animated.Value(0)
    };
  }

  updateItemHeight(height, items) {
    debugger
    //let numberOfItems = React.Children.count(this.props.items);
    let numberOfItems = 0;
    if(items.length) {
      numberOfItems = items.length < 4 ? items.length : 3
    }
    Animated.timing(this.state.height, {
        toValue: height * numberOfItems,
        duration: 200,
        easing :  Easing.linear
    }).start();
  }

  componentDidMount() {
    //this.updateItemHeight(this.props.height, this.props.items)
  }

  componentWillReceiveProps(nextProps) {
    debugger
    if(this.props.show && !nextProps.show) {
      let height = new Animated.Value(0);
      this.setState({
        ...this.state,
        height
      });
    } else {
      this.updateItemHeight(nextProps.height, nextProps.items)
    }
  }

  render() {
    let { items, positionX, positionY, show, onPress, width, height } = this.props;
    if (!show) {
      return null;
    }

    let scrollViewWidth = width;
    let scrollViewHeight = this.state.height;

    let renderedItems = React.Children.map(items, (item) => {
      debugger
      return (
        <TouchableWithoutFeedback onPress={() => onPress(item.props.children, item.props.value) }>
          <View>
            {item}
          </View>
        </TouchableWithoutFeedback>
      );
    });
    return (
        <AnimatedScrollView
          style={[styles.container, styles.shadow, { top: positionY, left: positionX, width: scrollViewWidth, height: scrollViewHeight }]}
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
