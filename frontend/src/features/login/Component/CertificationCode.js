import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import {
  Cursor,
  CodeField,
  useClearByFocusCell,
  useBlurOnFulfill,
} from "react-native-confirmation-code-field";

// value state를 보내주어야 함.
export const CertificationCode = ({ value, setValue }) => {
  const CELL_COUNT = 6;
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  return (
    <CodeField
      ref={ref}
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
