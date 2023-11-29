import crypto from 'crypto';
import zipcodes from 'zipcodes';

/**
 * This class is separate from @see {Util} because it has imports that
 * are not needed on the client side.
 * Keeping things separate allows us the keep the client bundle size small.
 */
export class ServerUtil {
    static getProperZipCode(zipCode: number): number {
        const details = zipcodes.lookup(zipCode);
        if (details) {
            return details.zip;
        }
        return 92101;
    }

    static getZipCoordinates(location: number): [number, number] {
        const details = zipcodes.lookup(location);
        if (details) {
            return [details.latitude, details.longitude];
        }
        return [32.715225, -117.1682754]
    }

    /**
     * Taken from https://stackoverflow.com/a/40191779/3654061
    */
    static uniqueId() {
        return crypto.randomBytes(16).toString('hex');
    }
}