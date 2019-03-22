/**
 * 
 */
package Ernest.Dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import Ernest.Entity.saOprole;

/**
 * @author Ernest
 *
 */
@Repository
public interface saOproleDaoI {
	
	/**
	 * 
	 */
	void save(saOprole saOprole);
	
	saOprole findBySaOproleId(String Id); 
		
	List<saOprole> findAllBySaOproleSmd5str(String smd5str);
	
	void update(saOprole saOprole);
	
	List<saOprole> findJob(String id);

	List<saOprole> findgroup(String id);
}
