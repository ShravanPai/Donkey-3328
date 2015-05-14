package donkey.server.utils;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.TreeMap;

import donkey.server.interfaces.Platform;
import donkey.server.interfaces.Player;

public class DonkeyPlatform implements Platform {

	private List<PlayCard> currentPlayCards = new ArrayList<PlayCard>();
	private List<PlayCard> passedPlayCards = new ArrayList<PlayCard>();
	private PlayingDeck deck;
	private Map<String, CardPlayer> players = new TreeMap<String, CardPlayer>();

	public DonkeyPlatform() {
		deck             = new PlayingDeck();
		currentPlayCards = deck.getCardsInDeck();
	}

	// Shuffles the cards - Implementation of
	// Fisher-Yates shuffling algorithm
	public void shuffleCards(List<PlayCard> currentPlayCards) {

		Random random             = new Random();
		int numberOfCards         = currentPlayCards.size();
		List<PlayCard> cardClones = new ArrayList<PlayCard>();
		int j;
		int[] shuffleArray = new int[52];

		// Get a clone of the currentCards
		for (int i = 0; i < numberOfCards; i++)
			cardClones.add(currentPlayCards.remove(0));

		// Create an array which holds the randomized positions
		for (int i = 0; i < numberOfCards; i++)
			shuffleArray[i] = i;

		// Actual randomizing algorithm
		for (int i = (shuffleArray.length - 1); i >= 1; i--) {
			j = random.nextInt(i);
			shuffleArray[i] ^= shuffleArray[j];
			shuffleArray[j] ^= shuffleArray[i];
			shuffleArray[i] ^= shuffleArray[j];
		}

		// Randomize the cards according to the array
		for (int i = 0; i < numberOfCards; i++)
			currentPlayCards.add(cardClones.get(shuffleArray[i]));

		// Clear cardClones to free memory
		cardClones.clear();
	}

	// get a card
	public PlayCard getCard() {
		return currentPlayCards.remove(0);
	}

	// Return number of cards available in the platform
	public int getNumberOfCardsInDeck() {
		return currentPlayCards.size();
	}

	// adding player to the table
	public void addPlayer(String playerName) {
		players.put(playerName, new CardPlayer(playerName));
	}

	// removing a player from the table
	public void removePlayer(String playerName) {
		players.remove(playerName);
	}
	// get all the player object table
	public Map<String, CardPlayer> getPlayerMap() {
		return players;
	}

	// get current cards
	public List<PlayCard> getCurrentPlayCards() {
		return currentPlayCards;
	}

	// Distribute current cards to players
	// If numberOfCards is -1, distribute normally
	// Or else distribute numberOfCards to each player in the list
	public void distributeCards(List<PlayCard> cards, int numberOfCards) {

		if (players.size() == 0) {
			System.out
					.println("Please add players before distributing cards..");
			return;
		}

		Set<String> playerNames = players.keySet();
		Iterator<String> playerNameIterator = playerNames.iterator();
		
		int modCounter        = players.size();
		int playerOffset      = 0;
		int currentCardNumber = 0;
		int cardCounter       = numberOfCards;

		System.out.println("Number Of Players : " + modCounter);

		while (cardCounter > 0) {
			// To be designed and coded
			currentCardNumber = 0 + playerOffset;
			if (playerNameIterator.hasNext()) {
				Player currentPlayer = players.get(playerNameIterator.next());
				while ((currentCardNumber <= (numberOfCards - 1)) && cardCounter > 0) {
					currentPlayer.addCard(cards.get(currentCardNumber));
					currentCardNumber += modCounter;
					cardCounter--;
				}
			}
			playerOffset++;
		}
		cards.clear();
	}
	
	public void playCard() {
		// TODO : logic to play card and collect cards on platform
	}
	
	// Resets all the parameters
	public void clearPlatformParameters() {
		clearGame();
	}
	
	private void clearGame() {
		this.currentPlayCards.clear();
		this.passedPlayCards.clear();
		this.deck = null;
		this.players.clear();
	}
	
	public List<Integer> getCardsForPlayer(String playerName) {
		Map<String, CardPlayer> playerMap = getPlayerMap();
		CardPlayer player = playerMap.get(playerName);
		List<PlayCard> cards = player.getPlayerCards();
		Iterator<PlayCard> cardIterator = cards.iterator();
		List<Integer> cardNumbers = new LinkedList<Integer>();
		
		while (cardIterator.hasNext())
			cardNumbers.add(cardIterator.next().getCardValue());
		
		return cardNumbers;
	}
	
}
