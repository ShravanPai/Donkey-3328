package donkey.server.utils;

import java.util.ArrayList;
import java.util.List;
import donkey.server.interfaces.Constants;
import donkey.server.interfaces.Deck;

public class PlayingDeck implements Deck {

	private List<PlayCard> cardsInDeck;

	// Constructor for Playing Deck
	public PlayingDeck() {
		createCards();
	}
	
	// Gets a card that is at the top of the list
	public PlayCard getCardFromDeck() {
		if(cardsInDeck.size() > 0)
			return cardsInDeck.remove(0);
		else
			return null;
	}
	
	// Returns the number of cards left in this deck
	public int cardsLeftInDeck() {
		return cardsInDeck.size();
	}
	
	
	// Return list of cards in deck
	public List<PlayCard> getCardsInDeck() {
		return cardsInDeck;
	}
	
	
	// Create cards for this Deck
	private void createCards() {
		cardsInDeck = new ArrayList<PlayCard>();
		for (int i = 1; i <= Constants.NUMBER_OF_SUITES; i++)
			for (int j = 1; j <= Constants.NUMBER_OF_CARDS_IN_SUITE; j++)
				cardsInDeck.add(new PlayCard(j, i));
	}
}
