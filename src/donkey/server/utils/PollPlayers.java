package donkey.server.utils;

import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/poll_players/")
public class PollPlayers {
	
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String pollPlayers() {
		return getPlayerList();
	}
	
	private String getPlayerList() {
		Map<String, CardPlayer> playerMap = Data.platform.getPlayerMap();
		Set<String> players = playerMap.keySet();
		StringBuilder playerList = new StringBuilder();
		Iterator<String> playerIterator = players.iterator();
		while (playerIterator.hasNext()) {
			playerList.append(playerIterator.next());
			playerList.append(System.lineSeparator());
		}
		return playerList.toString();
	}
	
}
