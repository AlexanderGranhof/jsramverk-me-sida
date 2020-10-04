import React, { useState, useEffect } from 'react'
import socket from '../services/socket'

type Message = {
    user: string
    time: Date
    message: string
}

export const useChat = (username?: string) => {
    const [messages, setMessages] = useState<Message[]>([])

    const send = (username: string, message: string) => {
        socket.emit('message', {
            user: username,
            time: new Date(),
            message,
        })
    }

    useEffect(() => {
        socket.emit('GET:stored_messages', (messages: Message[]) => {
            setMessages(
                messages.map((message) => {
                    return {
                        ...message,
                        time: new Date(message.time),
                    }
                }),
            )
        })
    }, [])

    useEffect(() => {
        if (!username) return

        socket.emit('user_connect', username)

        socket.on('client_message', (message: Message) => {
            console.log(messages, message)
            setMessages([...messages, { ...message, time: new Date(message.time) }])
        })

        return () => {
            socket.off('client_message')
        }
    }, [username, messages])

    return [messages, send] as [Message[], (username: string, message: string) => void]
}
