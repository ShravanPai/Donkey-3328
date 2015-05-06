/**
 * Description: This is a resource class that returns the instructions
 * to play this game
 */
package donkey.server.utils;

import java.io.BufferedReader;
import java.io.FileReader;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/instructions/")
public class Instructions {

	// This method is called if TEXT_PLAIN is request
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String getInstructions() {
		return readInstructionsFromFile();
	}

	private String readInstructionsFromFile() {
		StringBuilder instructions = new StringBuilder();
		String line = null;
		try {
			BufferedReader reader = new BufferedReader(new FileReader(
					"Resources/Files/Instructions.txt"));
			while ((line = reader.readLine()) != null) {
				instructions.append(line);
				instructions.append(System.lineSeparator());
			}
			reader.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return instructions.toString();
	}
}