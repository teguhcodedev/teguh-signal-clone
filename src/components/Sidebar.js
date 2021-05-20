import React, { useEffect, useState } from 'react'
import { Avatar, Button, Icon, IconButton } from '@material-ui/core'
import { Add, Search,SpeakerNotes } from '@material-ui/icons'
import { useSelector } from 'react-redux'
import '../css/Sidebar.css'
import { selectUser } from '../features/userSlice'
import db, { auth } from '../firebase'
import SidebarChat from './SidebarChat'
import Modal from 'react-modal';
import firebase from "firebase";

function Sidebar() {
    const user = useSelector(selectUser);
    const [modal,setModal] = useState(false);
    const [chatInput,setChatInput] = useState(null);
    const [imageInput,setImageInput] = useState("https://image.flaticon.com/icons/png/512/124/124034.png");
    const [chats,setChats] = useState([]);
    
    useEffect(()=>{
        db.collection('chats').orderBy("timestamp","desc")
        .onSnapshot((snapshot)=>setChats(snapshot.docs.map((doc)=>({
            id:doc.id,
            chatName:doc.data()
        }))))
    },[])

    const handleChat =(e)=>{
        if(chatInput){
            db.collection('chats').add({
                chatName:chatInput,
                chatImage:imageInput,
                timestamp:firebase.firestore.FieldValue.serverTimestamp()
            })
        }

        setChatInput(null)
        setImageInput("https://image.flaticon.com/icons/png/512/124/124034.png")
        setModal(false)
    }
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar
                src={user.photo}
                onClick={()=>auth.signOut()}
                    style={{
                        cursor:'pointer'
                    }}
                />
                <div className="sidebar__input">
                    <Search/>
                    <input
                    type="text"
                    placeholder="Search"
                    />
                </div>
                <Add
                onClick={()=>setModal(true)}
                style={{
                    color:'white',
                    fontSize:"xx-large",
                    paddingLeft:'10px',
                    cursor:'pointer'
                }}
                />
                <Modal
                style={{
                  overlay:{
                    width:500,
                    height:500,
                    zIndex:"1000",
                    background:"rgba(0,0,0,0.8)",
                    top:'50%',
                    left:"50%",
                    marginTop:"-225px",
                    marginLeft:"-250px"
                  }
                }}
                    isOpen={modal}
                    onRequestClose={()=>setModal(false)}
                >
                    <div className="modal__info">
                       <h3>Add New Chat Name</h3>
                       <input 
                       value={chatInput}
                       onChange={(e)=>setChatInput(e.target.value)}
                       required className="name__input"
                       className="modalInput" 
                       type="text" placeholder="Enter new chat name"/>
                       <h3 style={{marginTop:'25px'}}>Add New Profile Image (URL)</h3>
                       <input required 
                          value={imageInput}
                          onChange={(e)=>setImageInput(e.target.value)}
                       className="name__input" 
                       className="modalInput" type="text" placeholder="Enter new chat image url"/>
                       <div className="modal__add" style={{marginTop:40}}>
               
                           <IconButton onClick={handleChat}>
                               <Add style={{fontSize:"xx-large",color:'white'}}/>
                           </IconButton>
                       </div>
                        <button onClick={()=>setModal(false)} >
                            Close
                        </button>
                    </div>
                </Modal>
            </div>
            <div className="sidebar__chats">
                {
                    chats.map(({id,chatName})=>(
                        <SidebarChat
                            key={id}
                            id={id}
                            name={chatName.chatName}
                            chatImage={
                                chatName.chatImage
                            }
                        />
                    ))
                }
              
            </div>
            <div className="sidebar__notes">
                <div className="sidebar__notesIcon">
                <SpeakerNotes/>
            
                </div>
                <p>Note  to self</p>
            </div>
        </div>
    )
}

export default Sidebar