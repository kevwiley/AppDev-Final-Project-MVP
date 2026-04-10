const bcrypt = require('bcryptjs');
const { db, User, Part, Build } = require('./models');

async function seed() {
    await db.sync({ force: true });

    //Exampmle Users
    const admin = await User.create({
        username: 'admin',
        email: 'admin@test.com',
        password: await bcrypt.hash('password', 10),
        role: 'admin'
    });

    const user = await User.create({
        username: 'user1',
        email: 'user@test.com',
        password: await bcrypt.hash('password', 10),
        role: 'user'
    });

    //Example Parts 
    const parts = await Part.bulkCreate([
        //CPUs
        { name: 'AMD Ryzen 9 7900X', category: 'CPU', price: 440 },
        { name: 'Intel i9-13900K', category: 'CPU', price: 590 },
        { name: 'Intel i3-12100F', category: 'CPU', price: 95 },
        { name: 'AMD Ryzen 5 7600X', category: 'CPU', price: 230 },

        //GPUs
        { name: 'NVIDIA RTX 4080 Super', category: 'GPU', price: 1000 },
        { name: 'AMD Radeon RX 7600', category: 'GPU', price: 270 },
        { name: 'NVIDIA RTX 4060 Ti', category: 'GPU', price: 380 },
        { name: 'Intel Arc A770', category: 'GPU', price: 300 },

        //Motherboards
        { name: 'ASUS ROG Strix X670E-E', category: 'Motherboard', price: 480 },
        { name: 'Gigabyte B650 Gaming X', category: 'Motherboard', price: 190 },
        { name: 'MSI MAG B760 Tomahawk', category: 'Motherboard', price: 170 },
        { name: 'ASRock H610M-HVS', category: 'Motherboard', price: 70 },

        //RAM
        { name: 'G.Skill Trident Z5 32GB DDR5', category: 'RAM', price: 125 },
        { name: 'Corsair Vengeance LPX 8GB DDR4', category: 'RAM', price: 25 },
        { name: 'Kingston Fury Beast 64GB DDR5', category: 'RAM', price: 210 },
        { name: 'Crucial 16GB DDR5-4800', category: 'RAM', price: 55 },

        //Storage
        { name: 'Samsung 980 Pro 500GB', category: 'Storage', price: 80 },
        { name: 'Crucial P3 4TB NVMe', category: 'Storage', price: 230 },
        { name: 'Seagate BarraCuda 4TB HDD', category: 'Storage', price: 85 },
        { name: 'Western Digital Black SN850X 1TB', category: 'Storage', price: 110 }
    ]);

    //Example Builds one build is made by the admin, one by a user. Both are accessible to everyone, but only admins can delete.
    await Build.create({
        name: 'Admin Build',
        UserId: admin.id,
        cpuId: parts[0].id,
        gpuId: parts[3].id,
        motherboardId: parts[6].id,
        ramId: parts[9].id,
        storageId: parts[12].id
    });

    await Build.create({
        name: 'User Build',
        UserId: user.id,
        cpuId: parts[1].id,
        gpuId: parts[4].id,
        motherboardId: parts[7].id,
        ramId: parts[10].id,
        storageId: parts[13].id
    });

    console.log('Database Seeded');
}

seed();