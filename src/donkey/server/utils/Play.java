package donkey.server.utils;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/play/{userName}/{cardNumber}/")
public class Play {

	// This method is called if TEXT_PLAIN is request
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String clearGameParameters(@PathParam("userName") String userName, @PathParam("cardNumber") String cardNumber) {
		try {
			Data.platformDataLock.lock();
			int cardValue = Integer.parseInt(cardNumber);
			Data.platform.playCard(userName, cardValue);
		} catch (Exception e) {
			return "Exception while playing card";
		} finally {
			Data.platformDataLock.unlock();
		}
		return "Successfully Played card";
	}
}
