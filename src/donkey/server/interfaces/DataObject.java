package donkey.server.interfaces;

import javax.sql.rowset.CachedRowSet;

public interface DataObject {

	public void setValue(String column, String value);
	public int insert();
	public void addQueryCondition(String column, String value);
	public CachedRowSet queryFromTable();
}
