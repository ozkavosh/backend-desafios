import normalizr from "normalizr";

const authorSchema = new normalizr.schema.Entity('author');
const messagesSchema = new normalizr.schema.Entity('messages', { author: authorSchema });
export const chatSchema = new normalizr.schema.Entity('chat', { 
  messages: [messagesSchema]
})