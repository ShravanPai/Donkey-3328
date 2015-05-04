package donkey.server.interfaces;

import java.util.List;

import donkey.server.utils.PlayCard;

public interface Platform {

	void shuffleCards(List<PlayCard> currentCards);
	PlayCard getCard();
	void distributeCards(List<PlayCard> cards, int numberOfCards);
}
