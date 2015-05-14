package donkey.server.utils;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;


@Path("/start_game")
public class StartGame {
	int numberOfCards = 52;
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String startGame() {
		List<PlayCard> cards = Data.platform.getCurrentPlayCards();
		Data.platform.shuffleCards(cards);
		Data.platform.distributeCards(cards, numberOfCards);
		return "Game Started!!";
	}
	
}
