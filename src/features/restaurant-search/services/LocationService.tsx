import * as Location from 'expo-location';

enum LocationPermissionStatus {
    granted = 'granted',
    denied = 'denied',
    unknown = 'unknown',
}

class LocationService {
    public static requestLocationAccessPermission: () => Promise<LocationPermissionStatus> = async () => {
        // Request permission to access location
        const { status } = await Location.requestForegroundPermissionsAsync();

        switch (status) {
            case Location.PermissionStatus.GRANTED:
                return LocationPermissionStatus.granted;
            case Location.PermissionStatus.DENIED:
                return LocationPermissionStatus.denied;
            default:
                return LocationPermissionStatus.unknown;
        }
    };

    public static getCurrentLocation: () => Promise<{
        city: string | null;
        region: string | null;
        country: string | null;
    }> = async () => {
        // Get the current location
        const location: Location.LocationObject = (await Location.getLastKnownPositionAsync()) ?? (await Location.getCurrentPositionAsync({}));
        const { latitude, longitude } = location.coords;

        // Reverse geocode to get city, state, country
        const [reverseGeocode] = await Location.reverseGeocodeAsync({
            latitude,
            longitude,
        });

        const city = reverseGeocode.city;
        const region = reverseGeocode.region;
        const country = reverseGeocode.country;

        return { city, region, country };
    };
}

export default LocationService;
export { LocationPermissionStatus };