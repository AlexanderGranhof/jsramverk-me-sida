import React, { FunctionComponent, useState, useRef, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './chat.module.scss'
import './chat.transitions.scss'
import { useChat } from '../../hooks/chat'
import Button from '../button/button'
import dayjs from 'dayjs'
import ChatIcon from './icon'

const ChatButton: FunctionComponent<React.HTMLAttributes<HTMLDivElement>> = (props) => {
    return (
        <div {...props} className={styles['button']}>
            <ChatIcon />
        </div>
    )
}

type ChatProps = {
    show?: boolean
}

const Chat: FunctionComponent<ChatProps> = ({ show }) => {
    const [username, setUsername] = useState<string>()
    const [chat, send] = useChat(username)
    const [usernameInput, setUsernameInput] = useState('')
    const [message, setMessage] = useState('')
    const scrollToBottomRef = useRef<HTMLDivElement>(null)

    const classNames = [
        styles['container'],
        !username ? styles['username'] : '',
        !show ? styles['hidden'] : '',
    ]
        .filter((className) => className.length > 0)
        .join(' ')

    const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!username || !message) return

        send(username, message)
        setMessage('')
    }

    useEffect(() => {
        console.log('scrolling', chat)
        scrollToBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [chat, username])

    return (
        <div className={classNames}>
            {username ? (
                <div className={styles['chat-wrapper']}>
                    <div className={styles['chat-messages']}>
                        {chat.map((row) => {
                            return (
                                <div
                                    key={`${row.time.getTime()}_${row.user}`}
                                    className={[
                                        styles['chat-message'],
                                        row.user === username ? styles['self'] : '',
                                    ].join(' ')}
                                >
                                    <div className={styles['meta']}>
                                        <span>{dayjs(row.time).format('HH:mm a')}</span>
                                        <span>{row.user}</span>
                                    </div>
                                    <p className={styles['chat-message-text']}>{row.message}</p>
                                </div>
                            )
                        })}
                        <div ref={scrollToBottomRef} />
                    </div>
                    <div className="write-message">
                        <form onSubmit={handleSendMessage}>
                            <input
                                maxLength={255}
                                value={message}
                                type="text"
                                placeholder="Type your message here"
                                onChange={(event) => setMessage(event.target.value)}
                            />
                        </form>
                    </div>
                </div>
            ) : (
                <div className={styles['enter-username']}>
                    <h1>Please enter a username</h1>
                    <input
                        value={usernameInput}
                        onChange={(event) => setUsernameInput(event.target.value)}
                        type="text"
                    />
                    <Button
                        onClick={() => setUsername(usernameInput)}
                        className={styles['join-button']}
                    >
                        Join
                    </Button>
                </div>
            )}
        </div>
    )
}

const ChatHandler: FunctionComponent = () => {
    const [showChat, setShowChat] = useState(false)

    return (
        <div>
            <CSSTransition timeout={300} classNames="chat" in={showChat}>
                <Chat show={showChat} />
            </CSSTransition>
            <ChatButton onClick={() => setShowChat(!showChat)} />
        </div>
    )
}

export default ChatHandler
