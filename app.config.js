import 'dotenv/config';
export default {
    expo: {
        name: "FourkinAwesome",
        slug: "fourkin-awesome",
        extra: {
            yelpApiToken: process.env.YELP_API_TOKEN,
        },
    },
};
