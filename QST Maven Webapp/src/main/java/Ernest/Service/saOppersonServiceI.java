/**
 * 
 */
package Ernest.Service;

import com.alibaba.fastjson.JSONObject;

import Ernest.Entity.SaOpperson;

/**
 * @author Ernest
 *
 */
public interface saOppersonServiceI {
	
	JSONObject LoginBy(String name,String password);
	
	void save(SaOpperson saOpperson);
	
	JSONObject findPerson(String id,String md5Str);
	
	JSONObject likeFind(String id,String md5Str,String name);
}
