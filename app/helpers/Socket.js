import React from 'react';
import socketIOClient from 'socket.io-client';
import {BACKEND_URL} from 'react-native-dotenv';

export class Socket {
  static instance = false;
  socket = false;

  static getInstance() {
    if (Socket.instance === false) {
      Socket.instance = new Socket();
      // console.log("new instance");
    }

    return this.instance;
  }

  isInitialized() {
    return Boolean(this.socket);
  }

  init() {
    this.socket = socketIOClient(BACKEND_URL, {reconnection: false});
  }

  sync(int_id) {
    if (this.isInitialized()) this.destroy();
    this.init();
    this.emit('join', int_id);
  }

  addEvents(events) {
    Object.keys(events).map((e) => {
      console.log('adding : ' + e);
      this.on(e, events[e]);
    });
  }

  get() {
    return this.socket;
  }

  on(key, callback) {
    if (this.socket) {
      this.socket.on(key, callback);
    } else {
      console.log("can't add event to socket");
      // console.log(this.socket);
    }
  }

  emit(message, data) {
    if (this.socket) {
      this.socket.emit(message, data);
    } else {
      console.log('emit error: socket not defined');
    }
  }

  destroy() {
    if (this.socket) {
      // disconnect before
      this.socket.emit('disconnect');
      this.socket = false;
    }
  }
}
