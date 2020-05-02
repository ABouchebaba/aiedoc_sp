import * as firebase from "firebase/app";
import "firebase/auth";

export const validatePin = async (verificationId, verificationCode) => {
  const credential = firebase.auth.PhoneAuthProvider.credential(
    verificationId,
    verificationCode
  );
  return firebase.auth().signInWithCredential(credential);
};

export const sendPin = async (phoneNumber, recaptchaVerifier) => {
  const phoneProvider = new firebase.auth.PhoneAuthProvider();
  return phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier);
};

export const getOptions = () => firebase.app().options;
