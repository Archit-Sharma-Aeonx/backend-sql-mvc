import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const db = await mysql.createConnection({
host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
});

// await db.query(
//       "CREATE DATABASE IF NOT EXISTS notes_db"
// );

await db.query("USE notes_db");


// CREATING TABLE IN MYSQL BY EXPRESS::

// await db.query(`
//    CREATE TABLE notes(
//    id int not null auto_increment,
//    title varchar(255) not null,
//    contents text not null ,
//    created timestamp not null default current_timestamp(),
//    primary key (id)
//    )
// `);


//INSERTING DATA INSIDE THE TABLE::

// await db.query(`
//   insert into notes(title , contents )
//   values
//    ('Learn Express', 'Practice Express routes and middleware'),
//     ('MySQL Practice', 'Practice CRUD operations with MySQL'),
//     ('Build Notes API', 'Create GET, POST, PUT and DELETE APIs'),
//     ('Learn Middleware', 'Understand how Express middleware works'),
//     ('Database Connection', 'Connect Node.js application with MySQL'),
//     ('Practice Joins', 'Solve SQL INNER, LEFT and RIGHT JOIN queries'),
//     ('Learn Controllers', 'Understand request and response handling'),
//     ('Error Handling', 'Practice centralized error handling in Express'),
//     ('Learn Routes', 'Create and organize Express routes'),
//     ('Environment Variables', 'Store configuration values inside the env file'),
//     ('Async Await', 'Practice asynchronous JavaScript using async and await'),
//     ('Connection Pool', 'Understand and use MySQL connection pooling'),
//     ('SQL Functions', 'Practice string, numeric and date functions'),
//     ('Database Keys', 'Revise primary, foreign and candidate keys'),
//     ('Normalization', 'Practice 1NF, 2NF and 3NF concepts'),
//     ('API Testing', 'Test API endpoints and responses'),
//     ('GET Request', 'Build an endpoint to retrieve notes'),
//     ('POST Request', 'Build an endpoint to create new notes'),
//     ('PUT Request', 'Build an endpoint to update existing notes'),
//     ('DELETE Request', 'Build an endpoint to delete notes')
// `);

// const [data] = await db.query(`SELECT * FROM users;`)
// console.log(data);

// await db.query(`
//    CREATE TABLE users(
//    id int not null auto_increment,
//    name varchar(50) not null,
//    email varchar(100) not null ,
//    created timestamp not null default current_timestamp(),
//    primary key (id)
//    )
// `);

// await db.query ( 
//   `INSERT INTO users (name, email) VALUES
// ('Aarav Sharma', 'aarav.sharma1@gmail.com'),
// ('Vivaan Verma', 'vivaan.verma2@gmail.com'),
// ('Aditya Singh', 'aditya.singh3@gmail.com'),
// ('Arjun Mehta', 'arjun.mehta4@gmail.com'),
// ('Reyansh Gupta', 'reyansh.gupta5@gmail.com'),
// ('Krishna Patel', 'krishna.patel6@gmail.com'),
// ('Ishaan Kumar', 'ishaan.kumar7@gmail.com'),
// ('Shaurya Joshi', 'shaurya.joshi8@gmail.com'),
// ('Atharv Kapoor', 'atharv.kapoor9@gmail.com'),
// ('Kabir Malhotra', 'kabir.malhotra10@gmail.com'),
// ('Rohan Saini', 'rohan.saini11@gmail.com'),
// ('Rahul Thakur', 'rahul.thakur12@gmail.com'),
// ('Karan Bhatia', 'karan.bhatia13@gmail.com'),
// ('Nikhil Arora', 'nikhil.arora14@gmail.com'),
// ('Varun Khanna', 'varun.khanna15@gmail.com'),
// ('Mohit Chauhan', 'mohit.chauhan16@gmail.com'),
// ('Aman Saxena', 'aman.saxena17@gmail.com'),
// ('Rishabh Jain', 'rishabh.jain18@gmail.com'),
// ('Sahil Aggarwal', 'sahil.aggarwal19@gmail.com'),
// ('Ankit Yadav', 'ankit.yadav20@gmail.com'),
// ('Priyansh Mishra', 'priyansh.mishra21@gmail.com'),
// ('Harsh Vardhan', 'harsh.vardhan22@gmail.com'),
// ('Devansh Pandey', 'devansh.pandey23@gmail.com'),
// ('Ayush Tiwari', 'ayush.tiwari24@gmail.com'),
// ('Yash Choudhary', 'yash.choudhary25@gmail.com'),
// ('Manav Nair', 'manav.nair26@gmail.com'),
// ('Dhruv Reddy', 'dhruv.reddy27@gmail.com'),
// ('Lakshya Rao', 'lakshya.rao28@gmail.com'),
// ('Abhinav Das', 'abhinav.das29@gmail.com'),
// ('Aryan Bose', 'aryan.bose30@gmail.com'),
// ('Siddharth Roy', 'siddharth.roy31@gmail.com'),
// ('Parth Desai', 'parth.desai32@gmail.com'),
// ('Akash Kulkarni', 'akash.kulkarni33@gmail.com'),
// ('Gaurav Menon', 'gaurav.menon34@gmail.com'),
// ('Deepak Iyer', 'deepak.iyer35@gmail.com'),
// ('Vikas Shetty', 'vikas.shetty36@gmail.com'),
// ('Rajat Gill', 'rajat.gill37@gmail.com'),
// ('Sumit Bansal', 'sumit.bansal38@gmail.com'),
// ('Nitin Oberoi', 'nitin.oberoi39@gmail.com'),
// ('Pankaj Sood', 'pankaj.sood40@gmail.com'),
// ('Neha Sharma', 'neha.sharma41@gmail.com'),
// ('Ananya Verma', 'ananya.verma42@gmail.com'),
// ('Diya Singh', 'diya.singh43@gmail.com'),
// ('Ishita Mehta', 'ishita.mehta44@gmail.com'),
// ('Kavya Gupta', 'kavya.gupta45@gmail.com'),
// ('Aditi Patel', 'aditi.patel46@gmail.com'),
// ('Riya Kumar', 'riya.kumar47@gmail.com'),
// ('Meera Joshi', 'meera.joshi48@gmail.com'),
// ('Saanvi Kapoor', 'saanvi.kapoor49@gmail.com'),
// ('Tanya Malhotra', 'tanya.malhotra50@gmail.com'),
// ('Simran Saini', 'simran.saini51@gmail.com'),
// ('Pooja Thakur', 'pooja.thakur52@gmail.com'),
// ('Nisha Bhatia', 'nisha.bhatia53@gmail.com'),
// ('Priya Arora', 'priya.arora54@gmail.com'),
// ('Sneha Khanna', 'sneha.khanna55@gmail.com'),
// ('Sakshi Chauhan', 'sakshi.chauhan56@gmail.com'),
// ('Muskan Saxena', 'muskan.saxena57@gmail.com'),
// ('Shreya Mishra', 'shreya.mishra58@gmail.com'),
// ('Nandini Pandey', 'nandini.pandey59@gmail.com'),
// ('Kritika Tiwari', 'kritika.tiwari60@gmail.com'),
// ('Anjali Choudhary', 'anjali.choudhary61@gmail.com'),
// ('Tanvi Nair', 'tanvi.nair62@gmail.com'),
// ('Mansi Reddy', 'mansi.reddy63@gmail.com'),
// ('Palak Rao', 'palak.rao64@gmail.com'),
// ('Ayesha Das', 'ayesha.das65@gmail.com'),
// ('Ritika Bose', 'ritika.bose66@gmail.com'),
// ('Isha Roy', 'isha.roy67@gmail.com'),
// ('Komal Desai', 'komal.desai68@gmail.com'),
// ('Divya Kulkarni', 'divya.kulkarni69@gmail.com'),
// ('Sonal Menon', 'sonal.menon70@gmail.com'),
// ('Rohit Sharma', 'rohit.sharma71@gmail.com'),
// ('Vivek Verma', 'vivek.verma72@gmail.com'),
// ('Abhishek Singh', 'abhishek.singh73@gmail.com'),
// ('Tarun Mehta', 'tarun.mehta74@gmail.com'),
// ('Mayank Gupta', 'mayank.gupta75@gmail.com'),
// ('Saurabh Patel', 'saurabh.patel76@gmail.com'),
// ('Kunal Kumar', 'kunal.kumar77@gmail.com'),
// ('Himanshu Joshi', 'himanshu.joshi78@gmail.com'),
// ('Ansh Kapoor', 'ansh.kapoor79@gmail.com'),
// ('Jay Malhotra', 'jay.malhotra80@gmail.com'),
// ('Pranav Saini', 'pranav.saini81@gmail.com'),
// ('Shubham Thakur', 'shubham.thakur82@gmail.com'),
// ('Tushar Bhatia', 'tushar.bhatia83@gmail.com'),
// ('Naveen Arora', 'naveen.arora84@gmail.com'),
// ('Yuvraj Khanna', 'yuvraj.khanna85@gmail.com'),
// ('Akshay Chauhan', 'akshay.chauhan86@gmail.com'),
// ('Manish Saxena', 'manish.saxena87@gmail.com'),
// ('Sandeep Jain', 'sandeep.jain88@gmail.com'),
// ('Vishal Aggarwal', 'vishal.aggarwal89@gmail.com'),
// ('Arnav Yadav', 'arnav.yadav90@gmail.com'),
// ('Samarth Mishra', 'samarth.mishra91@gmail.com'),
// ('Advik Pandey', 'advik.pandey92@gmail.com'),
// ('Rudra Tiwari', 'rudra.tiwari93@gmail.com'),
// ('Ayaan Choudhary', 'ayaan.choudhary94@gmail.com'),
// ('Vihaan Nair', 'vihaan.nair95@gmail.com'),
// ('Daksh Reddy', 'daksh.reddy96@gmail.com'),
// ('Neil Rao', 'neil.rao97@gmail.com'),
// ('Om Das', 'om.das98@gmail.com'),
// ('Ved Bose', 'ved.bose99@gmail.com'),
// ('Arush Roy', 'arush.roy100@gmail.com')
// `);

//await db.query (`CREATE TABLE products (
  //   id INT AUTO_INCREMENT PRIMARY KEY,
  //   name VARCHAR(100) NOT NULL,
  //   price DECIMAL(10,2) NOT NULL,
  //   category VARCHAR(100),
  //   stock INT DEFAULT 0
  //   )
  // `);

//   await db.query (`INSERT INTO products (name, price, category, stock) VALUES
// ('MacBook Air M4', 99900.00, 'Laptop', 10),
// ('Dell Inspiron 15', 58999.00, 'Laptop', 15),
// ('HP Pavilion 14', 64999.00, 'Laptop', 8),
// ('Lenovo IdeaPad Slim 5', 61999.00, 'Laptop', 12),
// ('iPhone 16', 69900.00, 'Smartphone', 20),
// ('Samsung Galaxy S25', 74999.00, 'Smartphone', 18),
// ('OnePlus 13', 64999.00, 'Smartphone', 14),
// ('Google Pixel 9', 72999.00, 'Smartphone', 9),
// ('iPad Air', 59900.00, 'Tablet', 11),
// ('Samsung Galaxy Tab S9', 67999.00, 'Tablet', 7),
// ('AirPods Pro', 24900.00, 'Earphones', 25),
// ('Sony WH-1000XM5', 29990.00, 'Headphones', 13),
// ('Logitech MX Master 3S', 9995.00, 'Mouse', 30),
// ('Logitech K380', 2995.00, 'Keyboard', 22),
// ('Samsung 27 Inch Monitor', 18999.00, 'Monitor', 10),
// ('LG UltraGear Monitor', 27999.00, 'Monitor', 6),
// ('SanDisk 1TB SSD', 8999.00, 'Storage', 17),
// ('WD 2TB Hard Drive', 6499.00, 'Storage', 19),
// ('Anker 20000mAh Power Bank', 4499.00, 'Accessories', 28),
// ('Logitech C920 Webcam', 7999.00, 'Accessories', 16),
// ('ASUS Vivobook 16', 54999.00, 'Laptop', 11),
// ('Acer Aspire 7', 57999.00, 'Laptop', 9),
// ('ASUS TUF Gaming F15', 72999.00, 'Laptop', 6),
// ('Lenovo LOQ', 78999.00, 'Laptop', 8),
// ('Nothing Phone 2', 39999.00, 'Smartphone', 15),
// ('Motorola Edge 50 Pro', 31999.00, 'Smartphone', 17),
// ('Realme GT 6', 40999.00, 'Smartphone', 13),
// ('Xiaomi 14', 69999.00, 'Smartphone', 10),
// ('OnePlus Pad 2', 39999.00, 'Tablet', 12),
// ('Xiaomi Pad 6', 26999.00, 'Tablet', 18),
// ('Apple Watch Series 10', 46900.00, 'Smartwatch', 14),
// ('Samsung Galaxy Watch 7', 29999.00, 'Smartwatch', 16),
// ('Noise ColorFit Pro', 3999.00, 'Smartwatch', 35),
// ('JBL Flip 6', 11999.00, 'Speaker', 21),
// ('Marshall Emberton II', 17999.00, 'Speaker', 12),
// ('Sony SRS-XB100', 4999.00, 'Speaker', 27),
// ('Keychron K2', 8999.00, 'Keyboard', 14),
// ('Logitech G502', 5999.00, 'Mouse', 23),
// ('Razer DeathAdder V3', 6999.00, 'Mouse', 18),
// ('Samsung T7 1TB SSD', 9499.00, 'Storage', 16),
// ('Crucial P3 1TB SSD', 6499.00, 'Storage', 24),
// ('Seagate 2TB External HDD', 6999.00, 'Storage', 19),
// ('BenQ 24 Inch Monitor', 13999.00, 'Monitor', 11),
// ('Dell 27 Inch Monitor', 21999.00, 'Monitor', 9),
// ('Sony PlayStation 5', 54990.00, 'Gaming', 5),
// ('Xbox Series X', 52990.00, 'Gaming', 4),
// ('Logitech G29 Racing Wheel', 32999.00, 'Gaming', 7),
// ('Anker USB-C Hub', 3499.00, 'Accessories', 30),
// ('Apple 20W USB-C Adapter', 1999.00, 'Accessories', 40),
// ('Logitech Laptop Stand', 2499.00, 'Accessories', 26)
//   `);