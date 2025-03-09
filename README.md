# MongoDB Task

## Description
This script performs a series of MongoDB operations using Node.js and the `mongodb` package. The operations include inserting, updating, finding, and deleting documents in a MongoDB collection.

## Prerequisites
- Install [MongoDB](https://www.mongodb.com/try/download/community) and ensure it is running.
- Install Node.js and npm.
- Install the required package using:
  ```sh
  npm install mongodb
  ```

## Database Connection
The script connects to MongoDB using:
```js
const { MongoClient, ObjectId } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
```

## Operations

### 1. Insert two documents using `insertOne`
```js
await collection.insertOne({ name: "Arwa", age: 21 });
await collection.insertOne({ name: "Bata", age: 22 });
```

### 2. Insert 10 documents using `insertMany`
```js
const employees = [
  { name: "Ali", age: 27 },
  { name: "Mona", age: 27 },
  { name: "Talia", age: 27 },
  { name: "Mariam", age: 27 },
  { name: "Aisha", age: 27 },
  { name: "Menna", age: 33 },
  { name: "Abood", age: 19 },
  { name: "Aya", age: 25 },
  { name: "Manar", age: 37 },
  { name: "Omar", age: 28 }
];
await collection.insertMany(employees);
```

### 3. Find and count all documents where age is `27`
```js
const result27 = await collection.find({ age: 27 }).toArray();
console.log("Documents with age 27:", result27);
console.log("Count of documents with age 27:", result27.length);
```

### 4. Limit results to the first 3 documents where age is `27`
```js
const result27Limit = await collection.find({ age: 27 }).limit(3).toArray();
console.log("First 3 documents with age 27:", result27Limit);
```

### 5. Update the first 4 documents (set name)
```js
const update4docs = await collection.find().limit(4).toArray();
const newnames = ["Ahmed", "Arwa", "Mohamed", "Laila"];
for (let i = 0; i < update4docs.length; i++) {
  await collection.updateOne(
    { _id: new ObjectId(update4docs[i]._id) },
    { $set: { name: newnames[i] } }
  );
}
```

### 6. Increment age by 4 for the first 4 documents
```js
const update4age = await collection.find().limit(4).toArray();
for (let i = 0; i < update4age.length; i++) {
  await collection.updateOne(
    { _id: new ObjectId(update4age[i]._id) },
    { $inc: { age: 4 } }
  );
}
```

### 7. Increment age by 10 for all documents
```js
await collection.updateMany({}, { $inc: { age: 10 } });
```

### 8. Delete all documents where age is `41`
```js
const deleteManyResult = await collection.deleteMany({ age: 41 });
console.log(`Deleted ${deleteManyResult.deletedCount} documents (age 41)`);
```

## Execution
Run the script using:
```sh
node task2.js
```

## Expected Output
- Successfully inserted, updated, and deleted documents.
- Console logs indicating the modifications made.

## Closing the Connection
```js
await client.close();
console.log("Connection closed");
