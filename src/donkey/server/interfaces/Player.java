package donkey.server.interfaces;

import donkey.server.utils.PlayCard;

public interface Player {

	void addCard(PlayCard newCard);
	Card getCard(int position);
	void arrangeCards();
	String getPlayerName();
	boolean hasCardsLeft();
}
