import React from 'react';
import {Modal, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {BlurView} from '@react-native-community/blur';

export const LoadingModal = ({showModal, text}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {}}>
      <View style={styles.container}>
        <ActivityIndicator size={70} />
        <Text style={styles.primaryText}>{text}</Text>
        <BlurView blurType="dark" blurAmount={80} style={styles.notBlurred} />
      </View>
    </Modal>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  notBlurred: {...StyleSheet.absoluteFill},
};
