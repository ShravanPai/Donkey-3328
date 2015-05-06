/***
 * Description : Resource class that gets the user name and adds him to
 * the ip map to avoid duplicate joins.
 * TODO : Add logic to create a game.
 */

package donkey.server.utils;

import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

@Path("/hello/{userName}/")
public class Hello {

	// This method is called if TEXT_PLAIN is request
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String sayPlainTextHello(@PathParam("userName") String userName,
			@Context HttpServletRequest req) {
		String ip = req.getRemoteAddr();

		if (!isUniqueName(userName))
			return "Please select a unique name";

		// Check to see if there is multiple request from the same ip
		if (Data.playerIPs.containsKey(ip))
			if (isHost(ip))
				return Data.playerIPs.get(ip) + ", you are the host";

		if (Data.numberOfPlayers == 0) {
			recordPlayerIP(ip, userName);
			Data.host = ip;
			Data.platform.addPlayer(userName);
			return "Welcome " + Data.playerIPs.get(ip) + ", you are the host!!";
		} else {
			recordPlayerIP(ip, userName);
			Data.platform.addPlayer(userName);

			return "Welcome " + Data.playerIPs.get(ip)
					+ ", there is a game in progress. "
					+ System.lineSeparator() + "Host: "
					+ Data.playerIPs.get(Data.host) + System.lineSeparator()
					+ "Players: " + System.lineSeparator() + getPlayerNames();
		}
	}

	private boolean isUniqueName(String name) {
		for (Map.Entry<String, String> entry : Data.playerIPs.entrySet())
			if (name.trim().equals(entry.getValue()))
				return false;
		return true;
	}

	private boolean isHost(String ip) {
		if (Data.host.equals(ip))
			return true;
		else
			return false;
	}

	private void recordPlayerIP(String ip, String name) {
		Data.numberOfPlayers++;
		Data.playerIPs.put(ip, name);
	}

	private String getPlayerNames() {
		StringBuilder playersAsString = new StringBuilder();
		Set<String> players = Data.platform.getPlayerMap().keySet();
		Iterator iterator = players.iterator();
		while (iterator.hasNext()) {
			playersAsString.append(iterator.next());
			playersAsString.append(System.lineSeparator());
		}
		return playersAsString.toString();
	}
}