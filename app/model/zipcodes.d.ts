declare module 'zipcodes' {
    export interface ZipCodeDetails {
        zip: number;
        latitude: number;
        longitude: number;
        city: string;
        state: string;
        country: string;
    }

    export function lookup(zipCode: number): ZipCodeDetails | undefined;
}