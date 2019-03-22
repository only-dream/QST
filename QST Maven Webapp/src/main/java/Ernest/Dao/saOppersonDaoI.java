/**
 * 
 */
package Ernest.Dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import Ernest.Entity.SaOpperson;
import Ernest.Entity.SaOppersonOprole;

/**
 * @author Ernest
 *
 */
@Repository
public interface saOppersonDaoI {
	/**
	 * 人员登录查找
	 * @param name
	 * @param password
	 * @return
	 */
	SaOpperson Login(String name,String password);
	
	void save(SaOpperson saOpperson);
	
	List<SaOpperson> findPersonList(String id);
	
	List<SaOpperson> likeFindPersonList(String md5 ,String id,String name);
}
