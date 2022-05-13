import React, { useState, createRef } from "react";

import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, Text } from "react-native";
import {
  Cursor,
  CodeField,
  useClearByFocusCell,
  useBlurOnFulfill,
} from "react-native-confirmation-code-field";

// value state를 보내주어야 함.
export const CertificationCode = ({ navigation, value, setValue }) => {
  // const inputRef = createRef();
  const CELL_COUNT = 6;

  //cell안에 값이 입력되게끔 하는 hook
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  //celㅣ안의 글자가 다 채워지면 키보드 내려가게끔 하는 hook
  const inputRef = useBlurOnFulfill({ value, cellCount: CELL_COUNT });

  // cell에 focus되게 하는 함수를 이 컴포넌트 안에서 정의해주었음
  useFocusEffect(
    React.useCallback(() => {
      inputRef.current.focus();
      // Do something when the screen is focused
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [inputRef])
  );

  return (
    <CodeField
      ref={inputRef}
      {...props}
      // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
      value={value}
      onChangeText={setValue}
      cellCount={CELL_COUNT}
      rootStyle={styles.codeFieldRoot}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={({ index, symbol, isFocused }) => (
        <Text
          key={index}
          style={[styles.cell, isFocused && styles.focusCell]}
          onLayout={getCellOnLayoutHandler(index)}
        >
          {symbol || (isFocused ? <Cursor /> : null)}
        </Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
  codeFieldRoot: { marginTop: 20 },

  cell: {
    width: 30,
    height: 40,
    marginLeft: 8,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderColor: "white",
    color: "white",
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#bcbcbc",
  },
});
