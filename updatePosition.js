import React, { Component } from 'react';
import { NativeModules, findNodeHandle } from 'react-native';

module.exports = function (ref) {
  const handle = findNodeHandle(ref);
  setTimeout(() => {
    NativeModules.UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
        console.log(ref)
        console.log("MEASUREMENTS")
        console.log(x, y, width, height, pageX, pageY);
      ref._currentPosition(pageX, pageY);
    });
  }, 0);
};
