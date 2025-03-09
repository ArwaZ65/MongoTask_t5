const { MongoClient, ObjectId  } = require("mongodb");
const url="mongodb://127.0.0.1:27017"
const client = new MongoClient(url);

async function run(){
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        const db = client.db("companyt2");
        const collection = db.collection("employees");
    // task :

    // 1. Insert two documents using insertOne
    await collection.insertOne({name: "Arwa", age: 21});
    await collection.insertOne({name: "Bata", age:22});
    console.log("Inserted 2 documents using insertOne");
    // // // 2. Insert 10 documents using insertMany (5 with age 27)
    const employees=[
        {name: "ali", age: 27},
        {name: "mona", age: 27},
        {name: "talia", age: 27},
        {name: "mariam", age: 27},
        {name: "aisha", age: 27},
        {name: "menna", age: 33},
        {name: "abood", age: 19},
        {name: "aya", age: 25},
        {name: "manar", age: 37},
        {name: "omar", age: 28}
    ];
    await collection.insertMany(employees);
    console.log("Inserted 10 documents using insertMany");
    // // //  3. Find and count all documents where age is 27
    const result27 = await collection.find({age: 27}).toArray();
    console.log("Documents with age 27:", result27);
    console.log("Count of documents with age 27:", result27.length);
    // // //  4. Limit results to the first 3 documents where age is 27
    const result27Limit = await collection.find({age: 27}).limit(3).toArray();
    console.log("First 3 documents with age 27:", result27Limit);
    // 5. Update the first 4 documents (set name)
    const update4docs= await collection.find().limit(4).toArray();
    const newnames=["Ahmed", "Arwa", "Mohamed", "Laila"]
    for (let i = 0; i < update4docs.length; i++) {
        await collection.updateOne(
            {_id:new ObjectId(update4docs[i]._id) },
            {$set: {name: newnames[i]}}
        );
        console.log(`Updated document ${update4docs[i]._id} with name: ${newnames[i]}`);
    }
    console.log("Updated first 4 documents");
    // // 6.update age $inc age for the first 4==>+4
    const update4age=await collection.find().limit(4).toArray();
    for (let i = 0; i < update4age.length; i++) {
        await collection.updateOne(
            {_id:new ObjectId(update4age[i]._id) },
            {$inc: {age: 4}}
        );
        console.log(`Updated document ${update4age[i]._id} with age: ${update4age[i].age + 10}`);
    }
    console.log("Updated first 4 documents with age");
    // // 7. updateMany update age for all  inc age 10
    const updateManyResult = await collection.updateMany(
        { },
        {
          $inc: { age: 10 },
        }
        );
    console.log(`Updated ${updateManyResult.modifiedCount} documents (increment age by 10)`);
    // // 8.delete all with age:41 deleteMany  age 41   ==>> deletedCount
        const deleteManyResult = await collection.deleteMany({age: 41});
        console.log(`Deleted ${deleteManyResult.deletedCount} documents (age 41)`);

    }
     catch (error) {
        console.error("Error:", error);
    } 
    finally {
        await client.close();
        console.log("Connection closed");
  }
}
run();