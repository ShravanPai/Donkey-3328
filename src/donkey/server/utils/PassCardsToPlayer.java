package donkey.server.utils;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/pass_cards_to_player/{userName}/")
public class PassCardsToPlayer {

	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String passCards(@PathParam("userName") String userName) {
		
		try {
			Data.platformDataLock.lock();
			Data.platform.passCardsOnPlatformToPlayer(userName.trim());
			return "Successfully passed cards...to " + userName;
		} catch (Exception e) {
			return "Exception while passing cards to " + userName;
		} finally {
			Data.platformDataLock.unlock();
		}
	}
}
