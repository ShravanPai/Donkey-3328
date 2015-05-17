package donkey.server.utils;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/leave_game/{sessionNumber}/")
public class LeaveGame {

	// This method is called if TEXT_PLAIN is request
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String leaveGame(@PathParam("sessionNumber") String number) {
		int sessionNumber = Integer.parseInt(number);
		return endMyGame(sessionNumber);
	}
	
	private String endMyGame(int sessionNumber) {
		String playerName = Data.sessionInfo.get(sessionNumber);
		try {
			Data.platformDataLock.lock();
			Data.platform.removePlayer(playerName);
			Data.sessionInfo.remove(sessionNumber);
		// TODO : Remove player from platform
		return "Succesfully left the game";
		} catch (Exception e) {
			return "Successfuddly left the game";
		} finally {
			Data.platformDataLock.unlock();
		}
	}
}