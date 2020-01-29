import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {AnimatedSVGPath} from 'react-native-svg-animations';
import Bg from './b3CjtL.jpg';
import {Grid} from './svg';
import Block from './Block';
console.disableYellowBox = true;
const initBoard = Array(9).fill(null);

const App: () => React$Node = () => {
  const [turn, setTurn] = useState('X');
  const [winner, setWinner] = useState(null);
  const [board, setBoard] = useState([...initBoard]);

  const handleTouch = index => {
    let updateBoard = [...board];
    updateBoard[index] = turn;
    setBoard([...updateBoard]);
    board[index] = turn;
    checkWin(turn);
    if (turn === 'X') {
      setTurn('O');
    } else {
      setTurn('X');
    }
  };

  const handleReset = index => {
    setBoard([...initBoard]);
    setWinner(null);
  };

  const checkWin = player => {
    if (winner) return;
    let horizontal = [0, 3, 6].map(i => [i, i + 1, i + 2]);
    let vertical = [0, 1, 2].map(i => [i, i + 3, i + 6]);
    let diagonal = [[0, 4, 8], [2, 4, 6]];
    let allwins = [...horizontal, ...vertical, ...diagonal];
    let win = allwins.some(
      indices =>
        board[indices[0]] == player &&
        board[indices[1]] == player &&
        board[indices[2]] == player,
    );
    win && setWinner(player);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ImageBackground source={Bg} style={{width: '100%', height: '100%'}}>
        <SafeAreaView>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Tic Tac Toe</Text>
            <View style={styles.winContainer}>
              <Text style={styles.winner}>{winner && `${winner} wins`}</Text>
            </View>
            <View>
              {Grid.map((g, i) => (
                <View style={styles.grid} key={i}>
                  <AnimatedSVGPath
                    strokeColor={'grey'}
                    duration={300}
                    strokeWidth={8}
                    height={600}
                    width={600}
                    scale={0.65}
                    delay={500 * i}
                    d={g}
                    loop={false}
                  />
                </View>
              ))}
              <View style={styles.row}>
                {board.map((item, index) => (
                  <Block
                    id={index}
                    key={index}
                    turn={turn}
                    val={board[index]}
                    handleTouch={handleTouch}
                  />
                ))}
              </View>
            </View>
            <TouchableOpacity onPress={handleReset} style={styles.button}>
              <Text style={styles.buttonText}>RESTART</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    height: '100%',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: 36,
    fontWeight: '400',
    color: Colors.grey,
    fontFamily: 'Zapfino',
  },
  sectionDescription: {
    textAlign: 'center',
    fontFamily: 'Zapfino',
    marginTop: 30,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.grey,
  },
  winContainer: {
    height: 100,
    marginTop: -100,
    marginBottom: -100,
  },
  winner: {
    textAlign: 'center',
    fontFamily: 'Zapfino',
    fontSize: 46,
    fontWeight: '400',
    color: 'red',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  row: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  grid: {
    position: 'absolute',
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'Zapfino',
    color: 'grey',
    fontSize: 26,
  },
});

export default App;
