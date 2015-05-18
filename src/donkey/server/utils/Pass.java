package donkey.server.utils;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/pass_cards/")
public class Pass {

	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String passCards() {
		
		try {
			Data.platformDataLock.lock();
			Data.platform.passCardsOnPlatform();
			return "Successfully passed cards...Next round starts";
		} catch (Exception e) {
			return "Exception while passing the cards!!";
		} finally {
			Data.platformDataLock.unlock();
		}
	}
}
