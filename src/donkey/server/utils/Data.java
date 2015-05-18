package donkey.server.utils;

import java.util.Map;
import java.util.TreeMap;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import donkey.server.interfaces.Platform;


public class Data {

	public static int numberOfPlayers = 0;
	public static String host = null;
	public static int nextPlayerSessionNumber;

	public static Map<Integer, String> sessionInfo = new TreeMap<Integer, String>();
	public static Platform platform;
	
	public static Lock platformDataLock;
	
}
