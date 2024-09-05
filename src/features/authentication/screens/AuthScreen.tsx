import { AppDispatch, RootState } from '@redux';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, signInAnonymously } from '../redux';
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppNavigationParams } from '@navigation';

type BottomTabsNavigationProp = StackNavigationProp<AppNavigationParams, 'MainTabs'>;

const useNavigateToBottomTabs = () => {
    const navigation = useNavigation<BottomTabsNavigationProp>();

    return () => navigation.navigate('MainTabs');
};

const AuthScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const goToBottomTabs = useNavigateToBottomTabs();
    const { user, loading, error } = useSelector((state: RootState) => state.auth);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLogin, setIsLogin] = useState<boolean>(true);

    const handleAuth = () => {
        if (isLogin) {
            dispatch(loginUser({ email, password }));
        } else {
            dispatch(registerUser({ email, password }));
        }
    };

    const handleAnonymousSignIn = () => {
        dispatch(signInAnonymously());
    };

    useEffect(() => {
        if (user) {
            goToBottomTabs();
        }
    }, [user, goToBottomTabs]);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            testID="authScreen"
        >
            <View style={styles.innerContainer}>
                <Text style={[styles.title, { color: '#333' }]} testID="authTitle">
                    {isLogin ? 'Login' : 'Register'}
                </Text>

                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    mode="outlined"
                    theme={{ colors: { primary: '#007AFF' } }}
                    testID="emailInput"
                />
                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    secureTextEntry
                    mode="outlined"
                    theme={{ colors: { primary: '#007AFF' } }}
                    testID="passwordInput"
                />

                {error && <Text style={styles.error} testID="errorMessage">{error}</Text>}

                <Button
                    mode="contained"
                    onPress={handleAuth}
                    loading={loading}
                    disabled={loading}
                    style={styles.button}
                    contentStyle={styles.buttonContent}
                    labelStyle={{ color: 'white', fontSize: 16, fontWeight: '600' }}
                    testID="authButton"
                >
                    {isLogin ? 'Login' : 'Register'}
                </Button>

                <Button
                    onPress={() => setIsLogin(!isLogin)}
                    style={styles.switchButton}
                    labelStyle={styles.switchButtonText}
                    testID="switchButton"
                >
                    {isLogin ? 'Don\'t have an account? Register' : 'Already have an account? Login'}
                </Button>

                <Text style={styles.orText}>or</Text>

                <Button
                    onPress={handleAnonymousSignIn}
                    style={styles.minimalButton}
                    labelStyle={styles.minimalButtonText}
                    disabled={loading}
                    testID="anonymousButton"
                >
                    Sign In Anonymously
                </Button>

                {user && <Text style={styles.success} testID="successMessage">Welcome, {user.email || 'Anonymous'}!</Text>}
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 26,
        marginBottom: 24,
        textAlign: 'center',
        fontWeight: '600',
        color: '#333',
    },
    input: {
        marginBottom: 16,
        borderRadius: 8,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    button: {
        marginVertical: 16,
        borderRadius: 8,
        backgroundColor: '#007AFF',
    },
    buttonContent: {
        paddingVertical: 12,
    },
    switchButton: {
        marginTop: 16,
        backgroundColor: 'transparent',
    },
    switchButtonText: {
        color: 'black',
        fontSize: 16,
    },
    orText: {
        marginVertical: 16,
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
    },
    minimalButton: {
        backgroundColor: 'transparent', // No background for a subtle look
        paddingVertical: 8, // Less padding
    },
    minimalButtonText: {
        color: 'black', // Blue text to match the theme
        fontSize: 16,
    },
    error: {
        color: '#FF3B30',
        textAlign: 'center',
        marginBottom: 16,
    },
    success: {
        color: '#28A745',
        textAlign: 'center',
        marginTop: 16,
        fontSize: 16,
    },
});

export { AuthScreen };