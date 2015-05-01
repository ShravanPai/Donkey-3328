package donkey.server;

import javax.ws.rs.GET;
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
@Path("/hello/{userName}/{password}")
//@Path("/hello/")
public class Hello {

	// This method is called if TEXT_PLAIN is request
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String sayPlainTextHello(@PathParam("userName") String userName, @PathParam("password") String password) {
		//DataConnector data = new DataConnector();
		System.out.println("User : " + userName + " Password : " + password);
		//String userDetails = data.validateUser(userName, password);
		//return "Welcome : " + userDetails;
		return "Hello " + password;
	}

	// This method is called if XML is request
	@GET
	@Produces(MediaType.TEXT_XML)
	public String sayXMLHello() {
		return "<?xml version=\"1.0\"?>" + "<hello> Hello Jersey" + "</hello>";
	}

	// This method is called if HTML is request
	@GET
	@Produces(MediaType.TEXT_HTML)
	public String sayHtmlHello() {
	//	DataConnector data = new DataConnector();
		//String userName = data.getUserName("00001");
		//return "<html> " + "<title>" + "Hello Jersey" + "</title>"
			//	+ "<body><h1>" + "Hello " + userName + "</body></h1>" + "</html> ";
		return "Hello ... Message from Rest Service!!";
	}
}