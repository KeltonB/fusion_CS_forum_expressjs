const app = require('express')();
const express = require('express');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const ip = require('ip');
const fs = require('fs');
let forum_database;


var port = process.env.PORT || 3000;
class Post {
  constructor(creator, content) {
    this.content = content;
    this.creator = creator;
  }
}

class Thread {
  constructor(title, creator, topic) {
    this.creator = creator;
    this.posts = []; // = [new Post("Example", "Kelton's server systems idk")];
    this.title = title;
    this.topic = topic;

    this.id = Math.floor(Math.random() * 10000000);
  }
  add(post) {
    this.posts.push(post);
  }
}

class Database {

  constructor() {
    console.log('Database Object Initialized');
    this.threads = [];
  } // end of constructor

  addThread(thread) {
    console.log('Adding thread to database');
    threads.push(thread)
  } // END OF addThread

  getThreads(title) {
    // const threads_for_topic = this.threads.filter(thread => thread.topic === topic)
    let getThread = (value) => {return(value.title === topic);}; return this.threads.filter(getThread);
  } // END OF getThreads

  getThreadsFromAuthor(username){
    let threads_from_author = [];

    for(thread of this.threads){
      if (thread.creator === username) {
        threads_from_author.push(thread);
      }
    }

    return threads_from_author;
  }

  getThread(id){
    // const thread = this.threads.filter(thread=>thread.id===id)[0];
    console.log(`threads:${threads}`)
    var thread = undefined;
    for(var i = 0; i < threads.length; i++){
      if(threads[i].id == id){
        thread = threads[i];
        break;
      }
    }
    if(thread !== undefined){
      return thread;
    }
    return null;
  } // END OF getThread

} // END OF DATABASE CLASS


let threads = []

app.set("view engine", "ejs");

app.use(express.urlencoded({
  extended: false
}));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/page/:page_name", (req, res) => {
  let variables_to_pass_in = {};
  if (req.params.page_name === "programming") {
    console.log('SOMEBODY IS VISITING THE PROGRAMMING TOPIC PAGE');

    const topic_1 = {
      topic: "JavaScript is Cool!",
      posts: ["wassup!", "cool dude!"]
    }

    const topic_2 = {
      topic: "Elliot fixed the forum!!",
      posts: ["thats!", "really dude!"]
    }
    variables_to_pass_in.topics = [topic_1, topic_2]
  }
  res.render(req.params.page_name, variables_to_pass_in);
});

app.get("/thread/:id", (req, res) => {
  const thread_id = req.params.id;
  const thread = forum_database.getThread(thread_id);
  if(thread===null){
    res.send("Something is f**ed up.");
    console.log(`A thread that does not exist is being pinged:${thread}`);
    return;
  }
  res.render("fourm_base", {thread});
});

app.get("/u/:username", (req, res) => {
  const username = req.params.username;
  //res.send(`You entered the username ${username}`);
  const user_data = {
    username,
    created_threads: forum_database.getTheadsFromAuthor(username)
  };

  res.render(user, user_data);

});
app.post("/thread/:id", (req, res) => {
  const thread_id = req.params.id;
  const thread = forum_database.getThread(thread_id);
  thread.add(new Post(req.body.name, req.body.text));
  console.log(req.body.text);
  res.redirect(`/thread/${thread_id}`); // For multiple threads, rember to fix this ya goof.(directed at kelton, not you, unless you are me.)
});

app.get("/create-thread", (req, res) => {
  // req.params.id is the thread to post to.
  console.log('Somebody is making a new topic');

  // example.add(new Post("Some random s#!t", req.body.text, req.body.name));

  res.render("create_topic"); // For multiple threads, rember to fix this ya goof.(directed at kelton, not you, unless you are me.)
});

app.post("/crthread", (req, res) => {
  let topic = req.body.topic;
  let creator = req.body.creator;
  let title = req.body.title;
  let content = req.body.content;
  //create a new topic
  const newThread = new Thread(title, creator, topic);
  //create a new post, insert it into the topic above
  const firstPost = new Post(creator, content);
  newThread.add(firstPost);
  //add the new thread to the database
  forum_database.addThread(newThread);
  console.log(newThread);
  //redirect to the new topic's page (find it in your topics array by using a unique ID)
  res.redirect(`/thread/${newThread.id}`);
});

app.use(express.static(__dirname + "/public"));

http.listen(port, function () {
  console.log(`listening on: ${ip.address()}:${port}`);
  forum_database = new Database();
});