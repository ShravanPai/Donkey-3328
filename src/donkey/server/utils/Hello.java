package donkey.server.utils;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
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
	public String sayPlainTextHello(@PathParam("userName") String userName, @PathParam("password") String password) {
		if (Data.numberOfPlayers == 0) {
			Data.numberOfPlayers++;
			Data.host = userName;
			return "Welcome " + userName + ", you are the host!!";		
		} else {
			Data.numberOfPlayers++;
			return "Welcome " + userName + ", your host is " + Data.host + ", and there are "
					+ Data.numberOfPlayers + " players";
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
	
}