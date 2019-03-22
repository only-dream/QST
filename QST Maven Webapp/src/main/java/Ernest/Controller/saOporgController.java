/**
 * 
 */
package Ernest.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import Ernest.Service.saOporgServiceI;

/**
 * @author Ernest
 *
 */
@RestController
@RequestMapping("/saOporgController")
public class saOporgController {

	@Autowired
	private saOporgServiceI saOporgService;
	@PostMapping("/update")
	public String updateSaOporg(String jsonstr){
		JSONArray jsonA = JSONArray.parseArray(jsonstr);
		JSONObject json = jsonA.getJSONObject(0);
		String message = saOporgService.updateSaOporgById(json);
		
		return message;
	}
	
	@GetMapping("/SelectOporg")
	@ResponseBody
	public String getRoleList(String sMd5Str){
		String message = saOporgService.findRoleList(sMd5Str);
		return message;
	}
}
