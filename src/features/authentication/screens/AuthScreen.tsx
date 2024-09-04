import { AppDispatch, RootState } from '@redux';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../redux';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook
import { StackNavigationProp } from '@react-navigation/stack';
import { AppNavigationParams } from '@navigation';

type BottomTabsNavigationProp = StackNavigationProp<AppNavigationParams, 'MainTabs'>;

const useNavigateToBottomTabs = () => {
    const navigation = useNavigation<BottomTabsNavigationProp>();

    return () => navigation.navigate('MainTabs');
};

const AuthScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const goToBottomTabs = useNavigateToBottomTabs(); // Use the navigation hook
    const { user, loading, error } = useSelector((state: RootState) => state.auth);
    const { colors } = useTheme(); // Use the theme for consistent color scheme

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

    // Effect to navigate to the home screen when the user is authenticated
    useEffect(() => {
        if (user) {
            goToBottomTabs(); // Navigate to 'Home' when the user is authenticated
        }
    }, [user, goToBottomTabs]);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.innerContainer}>
                <Text style={[styles.title, { color: '#333' }]}>{isLogin ? 'Login' : 'Register'}</Text>

                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    mode="outlined"
                    theme={{ colors: { primary: '#007AFF' } }} // Use blue for primary accents
                />
                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    secureTextEntry
                    mode="outlined"
                    theme={{ colors: { primary: '#007AFF' } }}
                />

                {error && <Text style={styles.error}>{error}</Text>}

                <Button
                    mode="contained"
                    onPress={handleAuth}
                    loading={loading}
                    disabled={loading}
                    style={styles.button}
                    contentStyle={styles.buttonContent}
                    labelStyle={{ color: 'white', fontSize: 16, fontWeight: '600' }} // Button text in white
                >
                    {isLogin ? 'Login' : 'Register'}
                </Button>

                <Button onPress={() => setIsLogin(!isLogin)} style={styles.switchButton} labelStyle={styles.switchButtonText}>
                    {isLogin ? 'Don\'t have an account? Register' : 'Already have an account? Login'}
                </Button>

                {user && <Text style={styles.success}>Welcome, {user.email}!</Text>}
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#F5F5F5', // Neutral light background
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 26,
        marginBottom: 24,
        textAlign: 'center',
        fontWeight: '600', // Bold title
        color: '#333', // Dark gray text for titles
    },
    input: {
        marginBottom: 16,
        borderRadius: 8, // Rounded corners like in your screenshots
        backgroundColor: 'white', // Give it a card-like feel
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3, // Shadow for Android
    },
    button: {
        marginVertical: 16,
        borderRadius: 8,
        backgroundColor: '#007AFF', // Blue primary color like the screenshots
    },
    buttonContent: {
        paddingVertical: 12, // Provide more vertical padding
    },
    switchButton: {
        marginTop: 16,
        backgroundColor: 'transparent',
    },
    switchButtonText: {
        color: 'black', // Blue color to match the modern UI
        fontSize: 16, // Standard font size
    },
    error: {
        color: '#FF3B30', // Red for error messages
        textAlign: 'center',
        marginBottom: 16,
    },
    success: {
        color: '#28A745', // Green for success messages
        textAlign: 'center',
        marginTop: 16,
        fontSize: 16,
    },
});

export { AuthScreen };