//const message = require('../models/messageModel');
const db = require('../models/index.js');

exports.getAll = async (ctx) => {
  try {
    const messages = await db.Message.findAll();
    ctx.status = 200;
    ctx.body = messages;
  } catch (error) {
    ctx.status = 500;
    console.log(error);
  }
};

exports.postMessage = async (ctx) => {
  //console.log(ctx.request.body);
  try {
    //const msg = ctx.request.body;
    //await db.Message.create({
    //  content: msg.content,
    //  authorId: msg.authorId,
    //  timestamp: msg.timestamp
    //})
    await db.Message.create(ctx.request.body);
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
    console.log(error);
  }

};

