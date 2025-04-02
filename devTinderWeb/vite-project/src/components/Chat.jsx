import { useParams } from 'react-router-dom';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { createSocketConnection } from '../utils/socket'
import { useSelector } from 'react-redux';

const Chat = () => {
    
    const { targetUserId } = useParams();
    const user = useSelector((store)=> store?.user);
    const userId = user?._id;
    
    
    const [message, setMessage] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    
    useEffect(()=> {
        if(!userId){
            return
        }
        const socket = createSocketConnection();
        socket.emit("joinChat", {firstName : user.firstName, userId, targetUserId});

        socket.on("messageReceived", ({firstName, text}) => {
            setMessage((message)=>[...message, {firstName, text}])
        })

        return () => {
            socket.disconnect();
        }
    },[userId, targetUserId])
    
    const handleClick = () => {
        const socket = createSocketConnection();
        socket.emit("sendMessage", ({
            firstName: user.firstName,
            userId,
            targetUserId,
            text : newMessage
        }))
        setNewMessage("");
    }

  return (
    <div className='w-3/4 h-[75vh] border border-green-300 flex flex-col m-4 mx-auto'>
        <h1 className="p-5 border-b border-gray-600">Chat</h1>
        <div className='flex-1 overflow-scroll p-6'>
            {message.map((msg, index) => {
                return (
                    <div key={index}>
                        <div className="chat-header">
                          {`${msg.firstName}`}
                        </div>
                        <div className="chat-bubble chat-bubble-primary">{msg.text}</div>
                    </div>
                )
            })}
        </div>
        <div className='border-t border-green-300 flex gap-2 p-4 items-center'>
            <input 
            className='w-full p-2 rounded-lg font-semibold text-xl'
            type="text" 
            value={newMessage}
            onChange={(e)=> setNewMessage(e.target.value)}/>
            <button onClick={handleClick}
            className='btn btn-success'>send</button>
        </div>
    </div>
    
  )
}

export default Chat