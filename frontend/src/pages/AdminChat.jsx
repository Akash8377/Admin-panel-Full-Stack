import React, { useState, useEffect, useRef } from 'react';
import { CometChat } from '@cometchat-pro/chat';
import MDSpinner from 'react-md-spinner';
import config from './config';
import './AgentChat.css'

const agentUID = config.agentUID;
const AGENT_MESSAGE_LISTENER_KEY = 'agent-listener';
const limit = 30;

function Agent() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [chat, setChat] = useState([]);
  const [chatIsLoading, setChatIsLoading] = useState(false);
  const [customerIsLoading, setCustomerIsLoading] = useState(true);

  const messageRef = useRef(null);

  useEffect(() => {
    const fetchAuthToken = async (uid) => {
      const response = await fetch(`/api/auth?uid=${uid}`);
      const result = await response.json();
      return result.authToken;
    };

    const fetchUsers = async () => {
      const response = await fetch(`/api/users`);
      const result = await response.json();
      return result;
    };

    const authTokenPromise = fetchAuthToken(agentUID);
    authTokenPromise.then(
      (authToken) => {
        console.log('auth token fetched', authToken);
        CometChat.login(authToken).then(
          (user) => {
            console.log('Login successfully:', { user });
            const usersPromise = fetchUsers();
            usersPromise.then((result) => {
              setCustomers(result);
              setCustomerIsLoading(false);
            });

            const messageListener = new CometChat.MessageListener({
              onTextMessageReceived: (message) => {
                console.log('Incoming Message Log', { message });
                if (selectedCustomer === message.sender.uid) {
                  setChat((prevChat) => [...prevChat, message]);
                } else {
                  const aRegisteredCustomer = customers.filter((customer) => customer.uid === message.sender.uid);
                  if (!aRegisteredCustomer.length) {
                    setCustomers((prevCustomers) => [...prevCustomers, message.sender]);
                  }
                }
              },
            });
            CometChat.addMessageListener(AGENT_MESSAGE_LISTENER_KEY, messageListener);
          },
          (error) => {
            console.log('Initialization failed with error:', error);
          }
        );
      },
      (error) => {
        console.log('Fetching auth token failed with error:', error);
      }
    );

    return () => {
      CometChat.removeMessageListener(AGENT_MESSAGE_LISTENER_KEY);
      CometChat.logout();
    };
  }, [customers, selectedCustomer]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const message = messageRef.current.value;

    const textMessage = new CometChat.TextMessage(
      selectedCustomer,
      message,
      CometChat.MESSAGE_TYPE.TEXT,
      CometChat.RECEIVER_TYPE.USER
    );

    CometChat.sendMessage(textMessage).then(
      (message) => {
        console.log('Message sent successfully:', message);
        setChat((prevChat) => [...prevChat, message]);
      },
      (error) => {
        console.log('Message sending failed with error:', error);
      }
    );
    messageRef.current.value = '';
  };

  const selectCustomer = (uid) => {
    setSelectedCustomer(uid);
    fetchPreviousMessage(uid);
  };

  const fetchPreviousMessage = (uid) => {
    setChat([]);
    setChatIsLoading(true);

    const messagesRequest = new CometChat.MessagesRequestBuilder().setUID(uid).setLimit(limit).build();

    messagesRequest.fetchPrevious().then(
      (messages) => {
        console.log('Message list fetched:', messages);
        setChat(messages);
        setChatIsLoading(false);
      },
      (error) => {
        console.log('Message fetching failed with error:', error);
      }
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8 h-100pr border rounded">
          <div className="row">
            <div className="col-lg-4 col-xs-12 bg-light" style={{ height: 658 }}>
              <div className="row p-3">
                <h2>Customer List</h2>
              </div>
              <div className="cutsomer-con" style={{ height: '100%', overflow: 'auto' }}>
                <CustomerList customers={customers} customerIsLoading={customerIsLoading} selectedCustomer={selectedCustomer} selectCustomer={selectCustomer} />
              </div>
            </div>
            <div className="col-lg-8 col-xs-12 bg-light" style={{ height: 658 }}>
              <div className="row p-3 bg-white">
                <h2>Who you gonna chat with?</h2>
              </div>
              <div className="row pt-5 bg-white" style={{ height: 530, overflow: 'auto' }}>
                <ChatBox chat={chat} chatIsLoading={chatIsLoading} />
              </div>
              <div className="row bg-light" style={{ bottom: 0, width: '100%' }}>
                <form className="row m-0 p-0 w-100" onSubmit={handleSubmit}>
                  <div className="col-9 m-0 p-1">
                    <input id="text" className="input-client" type="text" name="text" ref={messageRef} placeholder="Type a message..." />
                  </div>
                  <div className="button-client">
                    <button className="btn btn-outline-secondary rounded border w-100" title="Send" style={{ paddingRight: 16 }}>
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatBox({ chat, chatIsLoading }) {
  if (chatIsLoading) {
    return (
      <div className="col-xl-12 my-auto text-center">
        <MDSpinner size="72" />
      </div>
    );
  } else {
    return (
      <div className="col-xl-12">
        {chat.map((chat) => (
          <div key={chat.id} className="message">
            <div className={`${chat.receiver !== agentUID ? 'balon1' : 'balon2'} p-3 m-1`}>{chat.text}</div>
          </div>
        ))}
      </div>
    );
  }
}

function CustomerList({ customers, customerIsLoading, selectedCustomer, selectCustomer }) {
  if (customerIsLoading) {
    return (
      <div className="col-xl-12 my-auto text-center">
        <MDSpinner size="72" />
      </div>
    );
  } else {
    return (
      <ul className="list-group list-group-flush w-100">
        {customers.map((customer) => (
          <li
            key={customer.uid}
            className={`list-group-item ${customer.uid === selectedCustomer ? 'active' : ''}`}
            onClick={() => selectCustomer(customer.uid)}
          >
            {customer.name}
          </li>
        ))}
      </ul>
    );
  }
}

export default Agent;