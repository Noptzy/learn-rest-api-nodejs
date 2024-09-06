const { faker } = require('@faker-js/faker'); 
const connection = require('./database');

const insertQuery = `INSERT INTO users (name, email, phone, gender) VALUES (?, ?, ?, ?)`;

for (let i = 0; i < 1000; i++) {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const phone = faker.phone.number(); 

    const gender = faker.helpers.arrayElement(['Male', 'Female']); 
    connection.query(insertQuery, [name, email, phone, gender], (err, result) => {
        if (err) {
            console.error(`Gagal menyimpan data:`, err);
        } else {
            console.log(`Data dummy ke-${i + 1} berhasil disimpan`);
        }
    });
}

connection.end();
