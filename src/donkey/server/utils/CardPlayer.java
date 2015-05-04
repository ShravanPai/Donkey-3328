package donkey.server.utils;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

import donkey.server.interfaces.Person;
import donkey.server.interfaces.Player;

@XmlRootElement
public class CardPlayer extends Person implements Player{

	private List<PlayCard> myCards;
	
	public CardPlayer(String name) {
		myCards    = new ArrayList<PlayCard>();
		setName(name);
	}
	
	// method to add card to my list
	public void addCard(PlayCard card) {
		myCards.add(card);
	}
	
	// return the card that is at the ith position
	public PlayCard getCard(int i) {
		return myCards.remove(i);
	}
	
	// arrange cards in my hand
	public void arrangeCards() {
		
		
	}
	
	// Returns the list of cards the current player has
	public List<PlayCard> getPlayerCards() {
		return myCards;
	}
	
	public String getPlayerName() {
		return getName();
	}
}
