/* TODO:
    The Quiz view starts with a question from the selected deck.
    The question is displayed, along with a button to show the answer.
    Pressing the 'Show Answer' button displays the answer.
    Buttons are included to allow the student to mark their guess as 'Correct' or 'Incorrect'
    The view displays the number of questions remaining.
    When the last question is answered, a score is displayed. This can be displayed as a percentage of correct answers or just the number of questions answered correctly.
    When the score is displayed, buttons are displayed to either start the quiz over or go back to the Individual Deck view.
    Both the 'Restart Quiz' and 'Back to Deck' buttons route correctly to their respective views.

*/
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';
