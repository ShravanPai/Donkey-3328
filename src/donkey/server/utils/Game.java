package donkey.server.utils;

import java.util.Iterator;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/get_game_state/{userName}")
public class Game {

	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String getGameInfoForPlayer(@PathParam("userName") String userName) {
		return getGameStateForPlayer(userName);
	}

	private String getGameStateForPlayer(String userName) {

		// TODO : Add cards that are on platform before appending the player's
		// cards
		try {
			Data.platformDataLock.lock();
			List<Integer> cardNumbers = Data.platform
					.getCardsForPlayer(userName);
			StringBuilder builder = new StringBuilder();
			Iterator<Integer> iterator = cardNumbers.iterator();
			if (cardNumbers.size() > 0)
				builder.append("Cards:");

			while (iterator.hasNext()) {
				builder.append(iterator.next().toString());
				builder.append(",");
			}
			return builder.toString();
		} catch (Exception e) {
			return "Game was already ended by your host";
		} finally {
			Data.platformDataLock.unlock();
		}
	}
}
