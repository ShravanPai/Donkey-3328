package com.donkey.util;

import com.util.classes.PlayCard;

public interface Player {

	void addCard(PlayCard newCard);
	Card getCard(int position);
	void arrangeCards();
	String getPlayerName();
}
