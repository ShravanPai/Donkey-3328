package donkey.server.utils;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/clear_bugs/")
public class ClearBugs {

	// This method is called if TEXT_PLAIN is request
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public void clearAllBugs() {
		System.out.println("Before : " + Bugs.bugMap.size());
		Bugs.bugMap.clear();
		System.out.println("After : " + Bugs.bugMap.size());
	}

}