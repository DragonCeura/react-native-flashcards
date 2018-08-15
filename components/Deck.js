// TODO: Individual deck view including the following:
// - Deck Title,
// - Number of cards
// - Option to start a quiz -> routing to the Quiz view
// - Option to add a new card/question to the deck -> routing to NewCard view
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';
