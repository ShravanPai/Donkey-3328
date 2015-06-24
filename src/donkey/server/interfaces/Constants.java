package donkey.server.interfaces;

public final class Constants {
	
	public static final int SPADES   = 1;
	public static final int CLUBS    = 2;
	public static final int HEARTS   = 3;
	public static final int DIAMONDS = 4;
	
	public static final int NUMBER_OF_CARDS_IN_SUITE = 13;
	public static final int NUMBER_OF_SUITES         = 4;
	public static final int NUMBER_OF_CARDS          = 52;
	
	public static final int ACE   = 1;
	public static final int JACK  = 11;
	public static final int QUEEN = 12;
	public static final int KING  = 13;
	
	// Constants required to access database
	public static final String JDBC_DRIVER   = "com.mysql.jdbc.Driver";
	public static final String TEST_DATABASE = "jdbc:mysql://localhost:3306/test";
	
	// MySQL credentials
	public static final String USER = "root";
	public static final String PASS = "";
	
	// Constants related to statuses
	public static final String SUCCESS = "success";
	public static final String FAILURE = "failure";
	public static final String ERROR = "error";
	
	// Constants related to JSON keys
	public static final String STATUS = "status";
	public static final String MESSAGE = "message";
}
