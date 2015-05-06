package donkey.server.utils;

import java.util.HashMap;
import java.util.Map;

import donkey.server.interfaces.Platform;


public class Data {

	public static int numberOfPlayers = 0;
	public static String host = null;
	
	public static Map<String, String> playerIPs = new HashMap<String, String>();
	
	public static Platform platform = new DonkeyPlatform();
	
}
