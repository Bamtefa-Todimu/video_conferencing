import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import { createRoot } from 'react-dom/client';
import {ContextProvider} from './SocketContext';

const container = document.getElementById('root');

const root = createRoot(container);  
  root.render(
  <ContextProvider>
    <App/>
  </ContextProvider>
  );
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
