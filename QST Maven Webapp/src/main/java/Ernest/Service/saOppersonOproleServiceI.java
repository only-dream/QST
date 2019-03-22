/**
 * 
 */
package Ernest.Service;

import com.alibaba.fastjson.JSONObject;

import Ernest.Entity.SaOppersonOprole;

/**
 * @author Ernest
 *
 */
public interface saOppersonOproleServiceI {
	
	String addSaOpersonOprole(JSONObject json);

	String updateSaOpersonOprole(JSONObject json);
	
	String DeleteSaOpersonOprole(String id);
	
	String findSaOpersonOprole(String id);
}
