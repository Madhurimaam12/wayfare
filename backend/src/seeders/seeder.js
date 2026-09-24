const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

async function seed() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log(' Connected');

    const db = mongoose.connection.db;

    // Clear existing data
    await db.collection('users').deleteMany({});
    await db.collection('departments').deleteMany({});
    await db.collection('travelpolicies').deleteMany({});
    await db.collection('travelrequests').deleteMany({});
    console.log('Cleared existing data');

    // Insert departments
    const departments = await db.collection('departments').insertMany([
      { name: 'Engineering', code: 'ENG', description: 'Software Engineering', isActive: true },
      { name: 'Sales', code: 'SALES', description: 'Sales Department', isActive: true },
      { name: 'Finance', code: 'FIN', description: 'Finance Department', isActive: true },
      { name: 'HR', code: 'HR', description: 'Human Resources', isActive: true }
    ]);
    console.log('Departments created');

    const deptIds = Object.values(departments.insertedIds);
    const salt = await bcrypt.genSalt(10);
    const adminPass = await bcrypt.hash('admin123', salt);
    const userPass = await bcrypt.hash('password123', salt);

    // Insert users
    const users = await db.collection('users').insertMany([
      { employeeId: 'ADMIN001', firstName: 'Admin', lastName: 'User', email: 'admin@wayfare.com', password: adminPass, role: 'admin', departmentId: deptIds[0], isActive: true },
      { employeeId: 'EMP001', firstName: 'John', lastName: 'Doe', email: 'john@wayfare.com', password: userPass, role: 'employee', departmentId: deptIds[0], isActive: true },
      { employeeId: 'EMP002', firstName: 'Jane', lastName: 'Smith', email: 'jane@wayfare.com', password: userPass, role: 'employee', departmentId: deptIds[1], isActive: true },
      { employeeId: 'EMP003', firstName: 'Bob', lastName: 'Wilson', email: 'bob@wayfare.com', password: userPass, role: 'employee', departmentId: deptIds[2], isActive: true },
      { employeeId: 'MGR001', firstName: 'Mike', lastName: 'Johnson', email: 'mike@wayfare.com', password: userPass, role: 'manager', departmentId: deptIds[0], isActive: true },
      { employeeId: 'MGR002', firstName: 'Lisa', lastName: 'Davis', email: 'lisa@wayfare.com', password: userPass, role: 'manager', departmentId: deptIds[1], isActive: true },
      { employeeId: 'FIN001', firstName: 'Sarah', lastName: 'Williams', email: 'sarah@wayfare.com', password: userPass, role: 'finance_officer', departmentId: deptIds[2], isActive: true },
      { employeeId: 'COORD001', firstName: 'Robert', lastName: 'Brown', email: 'robert@wayfare.com', password: userPass, role: 'travel_coordinator', departmentId: deptIds[0], isActive: true }
    ]);
    console.log(` ${users.insertedCount} users created`);

    const userIds = Object.values(users.insertedIds);

    // Update department managers
    await db.collection('departments').updateOne({ _id: deptIds[0] }, { $set: { managerId: userIds[4] } });
    await db.collection('departments').updateOne({ _id: deptIds[1] }, { $set: { managerId: userIds[5] } });

    // Insert policies
    await db.collection('travelpolicies').insertMany([
      { name: 'Domestic Accommodation', code: 'DOM-ACC', type: 'accommodation', applicableRoles: ['employee', 'manager'], limits: { max: 250, currency: 'USD' }, travelType: ['domestic'], isActive: true, createdBy: userIds[0] },
      { name: 'International Accommodation', code: 'INT-ACC', type: 'accommodation', applicableRoles: ['employee', 'manager'], limits: { max: 500, currency: 'USD' }, travelType: ['international'], isActive: true, createdBy: userIds[0] },
      { name: 'Meal Allowance', code: 'MEAL-ALLOW', type: 'meals', applicableRoles: ['employee', 'manager'], limits: { max: 75, currency: 'USD' }, travelType: ['domestic', 'international'], isActive: true, createdBy: userIds[0] },
      { name: 'Transport Policy', code: 'TRANS-POL', type: 'transport', applicableRoles: ['employee', 'manager'], limits: { max: 1000, currency: 'USD' }, travelType: ['domestic', 'international'], isActive: true, createdBy: userIds[0] }
    ]);
    console.log('Policies created');

    console.log('\n Wayfare database seeded successfully!');
    console.log('\nTest Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Admin:       admin@wayfare.com / admin123');
    console.log('Employee:    john@wayfare.com / password123');
    console.log('Manager:     mike@wayfare.com / password123');
    console.log('Finance:     sarah@wayfare.com / password123');
    console.log('Coordinator: robert@wayfare.com / password123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

seed();