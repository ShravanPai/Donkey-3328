package donkey.server.utils;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/end_game/")
public class EndGame {

	// This method is called if TEXT_PLAIN is request
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String clearGameParameters() {
		return endGame();
	}
	
	private String endGame() {
		Data.host = "";
		Data.numberOfPlayers = 0;
		Data.playerIPs.clear();
		Data.platform.clearPlatformParameters();
		return "Successfully ended this game";
	}
}