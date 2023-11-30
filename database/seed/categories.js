const itemConditions = ['brand new', 'excellent', 'good', 'fair'];
const vehicleConditions = ['excellent', 'good', 'fair', 'salvaged'];
const housingConditions = ['rental'];
const realEstateConditions = ['sale'];

const categories = [
    // Housing
    { label: 'For Rent', shortName: 'for_rent', sortValue: 1, parent: 'housing', conditions: housingConditions },
    { label: 'Real Estate', shortName: 'real_estate', sortValue: 2, parent: 'housing', conditions: realEstateConditions },
    { label: 'Rooms / Shared', shortName: 'rooms_shared', sortValue: 3, parent: 'housing', conditions: housingConditions },

    // For Sale
    { label: 'Antiques & Collectibles', shortName: 'antiques_collectibles', sortValue: 4, parent: 'for_sale', conditions: itemConditions },
    { label: 'Arts & Crafts', shortName: 'arts_crafts', sortValue: 5, parent: 'for_sale', conditions: itemConditions },
    { label: 'Auto Parts', shortName: 'auto_parts', sortValue: 6, parent: 'for_sale', conditions: itemConditions },
    { label: 'Baby & Kid', shortName: 'baby_kid', sortValue: 7, parent: 'for_sale', conditions: itemConditions },
    { label: 'Beauty & Health', shortName: 'beauty_health', sortValue: 8, parent: 'for_sale', conditions: itemConditions },
    { label: 'Bikes', shortName: 'bikes', sortValue: 9, parent: 'for_sale', conditions: itemConditions },
    { label: 'Books', shortName: 'books', sortValue: 10, parent: 'for_sale', conditions: itemConditions },
    { label: 'Clothing & Accessories', shortName: 'clothes_accessories', sortValue: 11, parent: 'for_sale', conditions: itemConditions },
    { label: 'Electronics', shortName: 'electronics', sortValue: 12, parent: 'for_sale', conditions: itemConditions },
    { label: 'Farm & Garden', shortName: 'farm_garden', sortValue: 13, parent: 'for_sale', conditions: itemConditions },
    { label: 'Furniture', shortName: 'furniture', sortValue: 14, parent: 'for_sale', conditions: itemConditions },
    { label: 'Household & Appliances', shortName: 'household_appliances', sortValue: 15, parent: 'for_sale', conditions: itemConditions },
    { label: 'Musical Instruments', shortName: 'musical_instruments', sortValue: 16, parent: 'for_sale', conditions: itemConditions },
    { label: 'Pets', shortName: 'pets', sortValue: 17, parent: 'for_sale', conditions: itemConditions },
    { label: 'Photo & Video', shortName: 'photo_video', sortValue: 18, parent: 'for_sale', conditions: itemConditions },
    { label: 'Sporting', shortName: 'sporting', sortValue: 19, parent: 'for_sale', conditions: itemConditions },
    { label: 'Tools', shortName: 'tools', sortValue: 20, parent: 'for_sale', conditions: itemConditions },
    { label: 'Toys & Games', shortName: 'toys_games', sortValue: 21, parent: 'for_sale', conditions: itemConditions },
    { label: 'Vehicles', shortName: 'vehicles', sortValue: 22, parent: 'for_sale', conditions: vehicleConditions },
];

async function run() {
    const MongoClient = require('mongodb').MongoClient;

    const url = 'mongodb://localhost:27030/local';
    const dbName = 'keep-nothing';

    const client = new MongoClient(url);

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('categories');

        await collection.deleteMany({});
        await collection.insertMany(categories);

        const postsCollection = db.collection('posts');
        await postsCollection.createIndex({ category: 1 }, { name: 'category_index' });

        console.log('Categories added successfully!');
    } finally {
        await client.close();
    }
}

run();