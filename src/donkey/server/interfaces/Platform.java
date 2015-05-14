package donkey.server.interfaces;

import java.util.List;
import java.util.Map;

import donkey.server.utils.CardPlayer;
import donkey.server.utils.PlayCard;

public interface Platform {

	void shuffleCards(List<PlayCard> currentCards);
	PlayCard getCard();
	void distributeCards(List<PlayCard> cards, int numberOfCards);
	void clearPlatformParameters();
	
	public void addPlayer(String playerName);
	public void removePlayer(String playerName);
	public Map<String, CardPlayer> getPlayerMap();
	public List<Integer> getCardsForPlayer(String playerName);
	public List<PlayCard> getCurrentPlayCards();
}
