package donkey.server.utils;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;


// Plain old Java Object it does not extend as class or implements 
// an interface

// The class registers its methods for the HTTP GET request using the @GET annotation. 
// Using the @Produces annotation, it defines that it can deliver several MIME types,
// text, XML and HTML. 

// The browser requests per default the HTML MIME type.

//Sets the path to base URL + /hello
@Path("/hello/{userName}/")
public class Hello {

	// This method is called if TEXT_PLAIN is request
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String sayPlainTextHello(@PathParam("userName") String userName, @Context HttpServletRequest req) {
		String ip = req.getRemoteAddr();
		
		if (!isUniqueName(userName))
			return "Please select a unique name";
		
		// Check to see if there is multiple request from the same ip
		if (Data.playerIPs.containsKey(ip)) {
			if (isHost(ip))
				return Data.playerIPs.get(ip) + ", you are the host";
			else
				return Data.playerIPs.get(ip) + ", there is already one game in progress, please join it or wait till it ends";
		}
		
		if (Data.numberOfPlayers == 0) {
			Data.playerIPs.put(ip, userName);
			Data.numberOfPlayers++;
			Data.host = ip;
			System.out.println("Player : " + Data.playerIPs.get(ip));
			return "Welcome " + Data.playerIPs.get(ip) + ", you are the host!!";
		} else {
			Data.playerIPs.put(ip, userName);
			Data.numberOfPlayers++;
			return "Welcome " + Data.playerIPs.get(ip) + ", your host is " + Data.playerIPs.get(Data.host) + ", and there are "
					+ Data.numberOfPlayers + " players";
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
}

	/*@POST
	@Produces(MediaType.TEXT_PLAIN)
	@Consumes(MediaType.APPLICATION_JSON)
	public String postHello() {
		System.out.println("---------");
		//System.out.println(user.getName());
		return "Welcome : " ;//+ user.getName();
	}*/
	
