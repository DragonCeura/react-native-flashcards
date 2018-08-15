// TODO: Routed to as a separate view from the main DeckList view.
/* TODO:
    The view includes a form for creating a new deck - which should just be an input for the title and a 'Create Deck' button.

    Pressing the button correctly creates the deck and routes the user to the Individual Deck view for the new deck.
*/
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';
