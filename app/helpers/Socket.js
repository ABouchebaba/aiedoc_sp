import React from 'react';
import socketIOClient from 'socket.io-client';

export class Socket {
  static instance = false;

  socket = false;
  initCallback = false;

  static getInstance() {
    if (Socket.instance === false) {
      Socket.instance = new Socket();
    }

    return this.instance;
  }

  isInitialized() {
    return Boolean(this.socket);
  }

  isConnected() {
    if (!this.isInitialized()) return false;
    return this.socket.connected;
  }

  // TODO: ADD on connect_error event.
  init(url, callback = () => {}) {
    // socket needs to be uninitialized and disconnected
    // to trigger initial connect
    if (this.isConnected()) {
      console.log('Init: Socket already initialized');
      return;
    }
    if (this.isInitialized()) {
      console.log('Init : Socket is already initialized');
      return;
    }

    this.initCallback = () => callback(Socket.instance);
    this.socket = socketIOClient(url, {reconnection: false});
    this.socket.on('connect', this.initCallback);
  }

  // TODO: ADD on connect_error event.
  sync() {
    // socket needs to be initialized and disconnected
    // to trigger connect (reconnect)
    if (this.isConnected()) {
      console.log('Sync : Socket is already connected');
      return;
    }
    if (!this.isInitialized()) {
      console.log('Sync : Socket is not initialized');
      return;
    }
    /// remove all event listeners to avoid duplicates
    this.socket.removeAllListeners();
    /// re-add the connect event listener for re-initialization
    this.socket.on('connect', this.initCallback);
    this.socket.connect();
  }

  addEvents(events) {
    if (!this.isConnected()) {
      console.log('Add Events : socket not connected or not initialized');
      return;
    }
    Object.keys(events).map((e) => {
      this.on(e, events[e]);
    });
  }

  on(key, callback) {
    if (!this.isConnected()) {
      console.log(`On ${key} : socket not connected or not initialized`);
      return;
    }
    this.socket.on(key, callback);
  }

  emit(message, data) {
    if (!this.isConnected()) {
      console.log(`Emit ${message} : socket not connected or not initialized`);
      return;
    }
    this.socket.emit(message, data);
  }

  disconnect() {
    if (!this.isInitialized()) {
      console.log('disconnect : socket is not initialized');
      return;
    }
    if (!this.isConnected()) {
      console.log('disconnect: Socket already disconnected');
      return;
    }
    this.socket.disconnect();
    console.log(this.socket.connected, this.socket.disconnected);
  }

  destroy() {
    this.disconnect();
    this.socket = false;
  }
}
