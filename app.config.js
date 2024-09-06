import 'dotenv/config';
export default {
    expo: {
        name: "FourkinAwesome",
        slug: "fourkin-awesome",
        extra: {
            yelpApiToken: process.env.YELP_API_TOKEN,
            firebaseApiKey: process.env.FIREBASE_API_KEY,
            firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
            firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
            firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            firebaseAppId: process.env.FIREBASE_APP_ID,
            firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID
        },
        "ios": {
            "bundleIdentifier": "com.yourcompany.yourapp"  // Add this line
        },
        android: {
            "package": "com.yourcompany.fourkinawesome"
        }
    },

};
