import React from 'react';
import {AppState} from 'react-native';

/**
 * Wrapper class around AppState
 */
export class AppStateEvents {
  static namedEvents = {};

  // uniquely add event listener
  static add(key, callback) {
    AppState.addEventListener(key, callback);
  }

  static addIfNotExists(key, callback) {
    // remove event before adding it to ensure unique aspect
    AppStateEvents.remove(key, callback);

    // console.log(`adding ${key} listener`);
    AppState.addEventListener(key, callback);
  }

  static addNamedEvent(name, event, callback) {
    if (AppStateEvents.namedEvents[name]) {
      console.log(`Event ${name} already exists`);
      return;
    }
    console.log('adding ', name);
    AppStateEvents.addIfNotExists(event, callback);
    AppStateEvents.namedEvents[name] = {
      event,
      callback,
    };
  }

  static removeNamedEvent(name) {
    const namedEvent = AppStateEvents.namedEvents[name];
    if (!namedEvent) {
      console.log('Warning: trying to remove unexisting named event');
    } else {
      console.log('removing ', name);
      const {event, callback} = namedEvent;
      AppStateEvents.remove(event, callback);
      delete AppStateEvents.namedEvents[name];
    }
  }

  static remove(key, callback) {
    try {
      AppState.removeEventListener(key, callback);
      // console.log("Removed event : " + key);
    } catch (e) {
      console.log(`event ${key} does not exist`);
    }
  }
}
