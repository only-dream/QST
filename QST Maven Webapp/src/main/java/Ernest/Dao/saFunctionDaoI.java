/**
 * 
 */
package Ernest.Dao;

import org.springframework.stereotype.Repository;

import Ernest.Entity.SaFunction;

/**
 * @author Ernest
 *
 */
@Repository
public interface saFunctionDaoI {

	
	void save(SaFunction saFunction);
	
	void updateById(SaFunction saFunction);
}
