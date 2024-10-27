import * as fs from 'fs';
import { faker } from '@faker-js/faker';

const categories = Array.from({ length: 100 }, () => ({
    name: faker.commerce.department(),
}));

fs.writeFileSync('categories.json', JSON.stringify(categories, null, 2));
