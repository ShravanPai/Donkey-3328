package com.donkey.util;

import java.util.List;

import com.util.classes.PlayCard;

public interface Deck {

	PlayCard getCardFromDeck();
	int cardsLeftInDeck();
	List<PlayCard> getCardsInDeck();
}
