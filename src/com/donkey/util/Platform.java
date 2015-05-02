package com.donkey.util;

import java.util.List;

import com.util.classes.PlayCard;

public interface Platform {

	void shuffleCards(List<PlayCard> currentCards);
	PlayCard getCard();
	void distributeCards(List<PlayCard> cards, int numberOfCards);
}
