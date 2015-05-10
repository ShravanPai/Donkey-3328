package donkey.server.utils;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/report_bug/{bugInfo}")
public class ReportBug {

	// This method is called if TEXT_PLAIN is request
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String reportABug(@PathParam("bugInfo") String bugInfo) {
		return fileBug(bugInfo);
	}
	
	private String fileBug(String bugInfo) {
		String bugInfoArray[] = bugInfo.split("~");
		Bugs.bugMap.put(bugInfoArray[0].trim(), bugInfoArray[1].trim());
		return "Successfully filed bug";
	}
}