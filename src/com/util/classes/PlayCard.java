package com.util.classes;

import com.donkey.util.Card;
import com.donkey.util.Constants;

public class PlayCard implements Card {

	private int suite;
	private int cardValue;

	public PlayCard(int cardValue, int suite) {
		this.suite     = suite;
		this.cardValue = cardValue;
	}

	// Get the value of the card
	public int getCardValue() {
		return cardValue;
	}

	// get card value as String
	public String getValueAsString() {
		switch (suite) {
		case Constants.SPADES:
			return getCardString();
		case Constants.CLUBS:
			return getCardString();
		case Constants.HEARTS:
			return getCardString();
		case Constants.DIAMONDS:
			return getCardString();
		}
		return "Error: Unable to return card value as String";
	}

	// Function that returns a string
	private String getCardString() {
		String suiteName = getSuiteName();
		switch (cardValue) {
		case 1:
			return "ACE OF " + suiteName;
		case 11:
			return "JACK OF " + suiteName;
		case 12:
			return "QUEEN OF " + suiteName;
		case 13:
			return "KING OF " + suiteName;
		}
		return cardValue + " OF " + suiteName;
	}

	// Get Suite Name
	private String getSuiteName() {
		switch (suite) {
		case Constants.SPADES:
			return "SPADES";
		case Constants.CLUBS:
			return "CLUBS";
		case Constants.HEARTS:
			return "HEARTS";
		case Constants.DIAMONDS:
			return "DIAMONDS";
		}
		return "Unable to return the suite name as string";
	}

}
