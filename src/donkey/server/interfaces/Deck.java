package donkey.server.interfaces;

import java.util.List;

import donkey.server.utils.PlayCard;

public interface Deck {

	PlayCard getCardFromDeck();
	int cardsLeftInDeck();
	List<PlayCard> getCardsInDeck();
}
