import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import {AnimatedSVGPath} from 'react-native-svg-animations';
import {Cross, Circle} from './svg';

export default function({turn, handleTouch, id, val}) {
  return (
    <TouchableOpacity
      disabled={!!val}
      onPress={() => {
        handleTouch(id);
      }}>
      <View style={styles.container}>
        {val === 'O' && (
          <AnimatedSVGPath
            strokeColor={'green'}
            duration={500}
            strokeWidth={5}
            height={110}
            width={110}
            delay={100}
            scale={1.1}
            d={Circle}
            loop={false}
          />
        )}
        {val === 'X' && (
          <>
            {Cross.map((d, i) => (
              <View style={{position: 'absolute'}}>
                <AnimatedSVGPath
                  key={i}
                  strokeColor={'blue'}
                  duration={500}
                  strokeWidth={5}
                  height={100}
                  width={100}
                  scale={1}
                  delay={500 * i}
                  d={d}
                  loop={false}
                />
              </View>
            ))}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    // borderWidth: 1,
    borderColor: 'black',
    // padding: 5,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
