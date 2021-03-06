/***
 * Description : Resource class that gets the user name and adds him to
 * the ip map to avoid duplicate joins.
 * TODO : Add logic to create a game.
 */

package donkey.server.utils;

import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.locks.ReentrantLock;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import donkey.server.interfaces.Constants;

@Path("/hello/{userName}/")
public class Hello {

	// This method is called if TEXT_PLAIN is request
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String sayPlainTextHello(@PathParam("userName") String userName) {

		// If userName already exists in the game
		if (!isUniqueUserName(userName)) {
			JsonObject obj = new JsonObject();
			String returnValue = "Please select a unique name";
			obj.addProperty(Constants.STATUS, Constants.FAILURE);
			obj.addProperty(Constants.MESSAGE, returnValue);
			obj.toString();
		}

		int newSessionNumber = Data.numberOfPlayers;
		Data.numberOfPlayers++;
		String returnString = addPlayerAndCreateGame(userName, newSessionNumber);
		return returnString;
	}

	private boolean isGameHost(int sessionNumber) {
		// TODO : Host can be any number and not only zero. Add this
		// functionality
		if (sessionNumber == 0)
			return true;
		return false;
	}

	// TODO : Modify this method to support random host
	private String getGameHostName() {
		return Data.sessionInfo.get(0);
	}

	private boolean isUniqueUserName(String userName) {
		userName = userName.trim();
		userName = userName.toLowerCase();
		for (Map.Entry<Integer, String> mapEntry : Data.sessionInfo.entrySet())
			if (userName.equals(mapEntry.getValue().toLowerCase()))
				return false;
		return true;
	}

	private String addPlayerAndCreateGame(String userName, int sessionNumber) {
		Data.sessionInfo.put(sessionNumber, userName);
		JsonObject obj = new JsonObject();
		if (isGameHost(sessionNumber)) {
			Data.platformDataLock = new ReentrantLock(true);
			Data.platform = new DonkeyPlatform();
			Data.platform.addPlayer(userName);
			String returnValue = "Welcome " + userName + ", you are the host."
					+ sessionNumber;
			
			obj.addProperty(Constants.STATUS, Constants.SUCCESS);
			obj.addProperty(Constants.MESSAGE, returnValue);
			System.out.println("Shravan Data : " + obj.toString());
			return obj.toString();
		} else {
			try {
				Data.platformDataLock.lock();
				Data.platform.addPlayer(userName);
				String returnValue = "Welcome " + userName
						+ ", a game is in progress/waiting players to join "
						+ System.lineSeparator() + "Host : "
						+ getGameHostName() + System.lineSeparator()
						+ "Players : " + System.lineSeparator()
						+ getPlayerNames() + "." + sessionNumber;
				
				obj.addProperty("message", returnValue);
				obj.addProperty("status", Constants.SUCCESS);
				return obj.toString();				
			} catch (Exception e) {
				obj.addProperty("message", e.toString());
				obj.addProperty("status", Constants.ERROR);
				return obj.toString();
			} finally {
				Data.platformDataLock.unlock();
			}
		}
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