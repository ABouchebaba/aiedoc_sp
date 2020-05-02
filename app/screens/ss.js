import { Notifications } from "expo";
import { AppState, Platform } from "react-native";
import { Component } from "react";
import { expoHagdak } from "../Store/actions/";
import { Audio } from "expo-av";

const isIos = Platform.OS === "ios";

export class NotificationHandler extends Component {
  state = {
    appState: AppState.current,
  };

  handleNotification = async (notification = {}) => {
    console.log("incoming push messsage", notification);
    const soundObject = new Audio.Sound();
      await soundObject.loadAsync(require("../../assets/notification.mp3"));
      await soundObject.playAsync();
      // Your sound is playing!
    // } catch (error) {
    //   // An error occurred!
    // }

    const { origin, data = {} } = notification;
    const isAppActive = this.state.appState === "active";

    //ios does not show push notification when app in foreground
    if (isIos && isAppActive) {
      return console.log("HIIIII");
    }

    if (origin === "selected") {
      console.log("kakakak");
    }
  };

  handleAppState = (nextAppState) => {
    this.setState({ appState: nextAppState });
  };

  async componentWillUnmount() {
    (await this._notificationSubscription) &&
      this._notificationSubscription.remove();
    AppState.removeEventListener("change", this.handleAppState);
  }

  async componentDidMount() {
    // expoHagdak()
    this._notificationSubscription = await Notifications.addListener(
      this.handleNotification
    );
    AppState.addEventListener("change", this.handleAppState);
  }

  render() {
    return null;
  }
}

export default NotificationHandler;
