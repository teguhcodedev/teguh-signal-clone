import { Avatar } from "@material-ui/core";
import { Add, EmojiEmotions, Flip, MessageSharp, MicNone, MoreHoriz, Search, Style } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../css/Chat.css";
import { selectChatImage, selectChatName,selectChatId } from "../features/chatSlice";
import db from "../firebase";
import Message from "./Message";
import firebase from "firebase"
import { selectUser } from "../features/userSlice";
import FlipMove from "react-flip-move"

function Chat() {
  const user = useSelector(selectUser)
  const chatId = useSelector(selectChatId)
  const chatImage = useSelector(selectChatImage);
  const chatName = useSelector(selectChatName);
  const [input,setInput] = useState("");
  const [messages,setMessages]= useState([]);


  useEffect(()=>{
    if(chatId){
      db.collection('chats').doc(chatId).collection('messages').
      orderBy("timestamp","desc").onSnapshot((snapshot)=>
      setMessages(snapshot.docs.map((doc)=>({
        id:doc.id,
        message:doc.data()
      }))))
    }
  },[chatId])

  const handleMessage = (e)=>{
    e.preventDefault();

    if(chatId){
      db.collection('chats')
      .doc(chatId)
      .collection('messages')
      .add({
        user:user,
        message:input,
        timestamp:firebase.firestore.FieldValue.serverTimestamp()
      })
    }

    setInput("")
  }
  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerLeft">
            <Avatar 
              src={chatImage}
            />
            <h5>{chatName}</h5>
        </div>
        <div className="chat__headerRight">
            <Search/>
            <MoreHoriz/>
        </div>
      </div>
      <div className="chat__body">
          <div className="message__header">
              <Avatar
                  src={chatImage}
              />
              <h3>{chatName}</h3>
          </div>
          
    <FlipMove>

    {
      messages.map(({id,message})=>(
        <Message key={id} id={id} 
        message={message.message}
        timestamp={message.timestamp}
        sender={message.user.email}
        senderName={message.user.displayName}
        
        />
      ))
    }
              
    </FlipMove>
    
        
      </div>
      <div className="chat__footer">
          <EmojiEmotions/>
          <form>
              <input 
              required
              value={input}
              onChange = {(e)=>setInput(e.target.value)}
              placheholder="Send a message"
              type="text"/>
              <button type="submit" onClick={handleMessage}>
                  Send
              </button>
          </form>
          <div className="chat__footerIcons">
              <Style/>
              <MicNone/>
              <Add/>
          </div>
      </div>
    </div>
  );
}

export default Chat;
