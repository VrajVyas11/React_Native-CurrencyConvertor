/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  FlatList,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import { currencyByRupee } from './constants';

import CurrencyButton from './components/CurrencyButton';
import background from "./assets/CurrencyBG1.jpg"
import background1 from "./assets/EXBG.jpg"
import Snackbar from 'react-native-snackbar';

function App(): React.JSX.Element {

  const [inputValue, setInputValue] = useState("")
  const [resultValue, setResultValue] = useState("")
  const [targetCurrency, setTargetCurrency] = useState("")

  const buttonPressed = (targetValue: Currency) => {
    if (!inputValue) {
      return Snackbar.show({
        text: "Enter value to Convert",
        backgroundColor: "#EA7773",
        textColor: "#000000"
      })
    }

    const inputAmount = parseFloat(inputValue)
    if (!isNaN(inputAmount)) {
      const convertedValue = inputAmount * targetValue.value
      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)}`
      setResultValue(result)
      setTargetCurrency(targetValue.name)
    }
    else {
      return Snackbar.show({
        text: "Cant't Convert ... Invalid Number",
        backgroundColor: "#F4BE2C",
        textColor: "#000000"
      })
    }
  }
  return (
    < >
      <StatusBar
      />
      <ImageBackground source={background1} style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.rupeesContainer}>
            <Text style={styles.rupee}>₹</Text>
            <TextInput

              style={styles.inputBox}
              maxLength={14}
              value={inputValue}
              onChangeText={setInputValue}
              keyboardType='number-pad'
              placeholder='Enter Amount In Rupees'
            />
          </View>
          {resultValue &&
            (
              <Text style={styles.resultTxt}>
                {resultValue}
              </Text>
            )}
        </View>
        <View  style={styles.bottomContainer}>
            <FlatList
              numColumns={2}
              data={currencyByRupee}
              keyExtractor={item => item.name}
              renderItem={({ item }) => (
                <Pressable
                  style={[styles.button, targetCurrency === item.name && styles.selected]}
                  onPress={() => buttonPressed(item)}
                >
                  <CurrencyButton {...item} />
                </Pressable>
              )}
            />
     
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  inputBox: {
    backgroundColor: "white",
    borderRadius: 999,
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // backgroundColor: 'rgba(244, 190, 44, 0.4)',
    backgroundColor:'rgba(109, 197, 209, 0.6)'
  },
  resultTxt: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '800',
  },
  rupee: {
    marginRight: 8,
    backgroundColor: "white",
    fontSize: 22,
    color: '#000000',
    fontWeight: '800',
    borderRadius: 999,
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "white",
    borderRadius: 999,
    padding: 3,
    paddingHorizontal: 20
  },
  inputAmountField: {
    height: 40,
    width: 200,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  bottomContainer: {
    flex: 3,
    width: '100%',
    height: '100%',
  },
  button: {
    flex: 1,
    margin: 12,
    height: 60,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selected: {
    backgroundColor: '#ffeaa7',
  },
});

export default App;
