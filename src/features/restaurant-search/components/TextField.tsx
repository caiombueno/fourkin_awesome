import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';

interface TextFieldProps extends TextInputProps {
    label?: string;
    errorMessage?: string;
    containerStyle?: object;
    inputStyle?: object;
    labelStyle?: object;
    errorStyle?: object;
}

const TextField: React.FC<TextFieldProps> = ({
    label,
    errorMessage,
    containerStyle,
    inputStyle,
    labelStyle,
    errorStyle,
    onChangeText,
    value,
    ...props
}) => {
    const [inputValue, setInputValue] = useState(value || '');

    useEffect(() => {
        const handler = setTimeout(() => {
            if (onChangeText) {
                onChangeText(inputValue);
            }
        }, 2000); // 2 seconds delay

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue, onChangeText]);

    const handleInputChange = (text: string) => {
        setInputValue(text);
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
            <TextInput
                style={[styles.input, inputStyle]}
                value={inputValue}
                onChangeText={handleInputChange}
                {...props}
            />
            {errorMessage && <Text style={[styles.error, errorStyle]}>{errorMessage}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    label: {
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 16,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    error: {
        marginTop: 5,
        color: 'red',
        fontSize: 14,
    },
});

export default TextField;
