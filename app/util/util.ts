export class String {
    static isNullOrWhitespace(value?: string) {
        return !(value?.trim()?.replace(/\s/g, ''));
    }
}

export class Util {
    static formatPrice(price: number | undefined): string {
        if (price) {
            return `$${price.toLocaleString()}`;
        } else {
            return 'Free';
        }
    };

    static formatShortDateTime(date: Date | undefined): string {
        if (date) {
            const options: Intl.DateTimeFormatOptions = { year: undefined, month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            return date.toLocaleDateString(undefined, options);
        } else {
            return '';
        }
    }

    static timeAgo(dateString: string | Date) {
        const date = new Date(dateString);
        const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
        let interval = Math.floor(seconds / (365 * 24 * 60 * 60));

        if (interval >= 1) {
            return interval + (interval > 1 ? ' years ago' : ' year ago');
        }
        interval = Math.floor(seconds / (30 * 24 * 60 * 60));
        if (interval >= 1) {
            return interval + (interval > 1 ? ' months ago' : ' month ago');
        }
        interval = Math.floor(seconds / (24 * 60 * 60));
        if (interval >= 1) {
            return interval + (interval > 1 ? ' days ago' : ' day ago');
        }
        interval = Math.floor(seconds / (60 * 60));
        if (interval >= 1) {
            return interval + (interval > 1 ? ' hours ago' : ' hour ago');
        }
        interval = Math.floor(seconds / 60);
        if (interval >= 1) {
            return interval + (interval > 1 ? ' minutes ago' : ' minute ago');
        }
        return Math.floor(seconds) + (seconds > 1 ? ' seconds ago' : ' second ago');
    }

    static sanitizePhoneNumber(phone: string) {
        return phone.replace(/\D/g, '');
    }
}