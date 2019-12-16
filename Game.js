import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View} from 'react-native';

const GRID_LENGTH = 3;
let turn = 'X';

const Game = () => {
  const [grid, setGrid] = useState([]);

  const initializeGrid = () => {
    const tempGrid = [];
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
      const tempArray = [];
      for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
        tempArray.push(0);
      }
      tempGrid.push(tempArray);
    }
    setGrid(tempGrid);
  };

  const getBox = (index, colIdx, rowIdx) => {
    let backgroundColor = 'red';
    const sum = colIdx + rowIdx;
    if (sum % 2 === 0) {
      backgroundColor = 'blue';
    }
    const gridValue = grid[colIdx][rowIdx];
    let content = '-';
    if (gridValue === 1) {
      content = 'X';
    } else if (gridValue === 2) {
      content = 'O';
    }
    return (
      <View key={index} styles={{...styles.boxStyle, backgroundColor}}>
        <Text>{content}</Text>
      </View>
    );
  };

  const getRow = (row, colIdx) => {
    return row.map((item, index) => {
      return getBox(index, colIdx, index);
    });
  };

  const getColumns = () => {
    return grid.map((row, index) => {
      return (
        <View style={styles.rowStyle} key={index}>
          {getRow(row, index)}
        </View>
      );
    });
  };

  const renderMainGrid = () => {
    return (
      <View style={{display: 'flex'}}>
        <View style={styles.columnsStyle}>{getColumns()}</View>
      </View>
    );
  };

  useEffect(() => {
    initializeGrid();
  }, []);

  if (grid.length === 0) {
    return <Text> initializing </Text>;
  }
  return renderMainGrid();
};

const styles = StyleSheet.create({
  columnsStyle: {
    flexDirection: 'column',
  },
  rowStyle: {
    flexDirection: 'row',
  },
  boxStyle: {width: 100, height: 100},
});

export default Game;
