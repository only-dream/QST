/**
 * 
 */
package Ernest.Dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import Ernest.Entity.SaOppersonOprole;

/**
 * @author Ernest
 *
 */
@Repository
public interface saOppersonOproleDaoI {

	
	void save(SaOppersonOprole saOppersonOprole);
	
	void updateById(SaOppersonOprole saOppersonOprole);
	
	SaOppersonOprole findById(String id);
	
	void deletById(String id);
	
	
}
