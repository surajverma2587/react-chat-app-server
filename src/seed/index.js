const db = require("../config/connection");
const users = require("./users");
const posts = require("./posts");
const { User, Post } = require("../models");

db.once("open", async () => {
  try {
    await User.deleteMany();
    await Post.deleteMany();

    console.log("Database cleared successfully!");

    await User.insertMany(users);

    console.log("Users seeded successfully!");

    const usersFromDb = await User.find({});

    const usersMap = [
      {
        from: "bob.smith",
        to: "alice.green",
      },
      {
        from: "bob.smith",
        to: "alice.green",
      },
      {
        from: "bob.smith",
        to: "carol.jones",
      },
      {
        from: "carol.jones",
        to: "alice.green",
      },
      {
        from: "alice.green",
        to: "carol.jones",
      },
    ];

    const postsToSeed = posts.map((post, index) => {
      const { _id: fromUser } = usersFromDb.find(
        (user) => user.username === usersMap[index].from
      );

      const { _id: toUser } = usersFromDb.find(
        (user) => user.username === usersMap[index].to
      );
      return {
        fromUser,
        toUser,
        ...post,
      };
    });

    await Post.insertMany(postsToSeed);

    console.log("Posts seeded successfully!");

    process.exit(0);
  } catch (error) {
    console.log(error.message);
  }
});
