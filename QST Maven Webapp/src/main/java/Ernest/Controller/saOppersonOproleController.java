/**
 * 
 */
package Ernest.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import Ernest.Service.saOppersonOproleServiceI;


/**
 * @author Ernest
 *
 */
@RestController
@RequestMapping("/saOppersonOprole")
public class saOppersonOproleController {
//	
	@Autowired
	private saOppersonOproleServiceI saOppersonOproleService;
	
	@PostMapping("/save")
	public String save(String jsonstr){
		System.out.println("进入");
		JSONArray  jsonA = JSONArray.parseArray(jsonstr);
		JSONObject json = jsonA.getJSONObject(0);
		String message = saOppersonOproleService.addSaOpersonOprole(json);
		return message;
	}
	
	@PostMapping("/update")
	public String update(String jsonstr){
		JSONArray  jsonA = JSONArray.parseArray(jsonstr);
		JSONObject json = jsonA.getJSONObject(0);
		String message = saOppersonOproleService.updateSaOpersonOprole(json);
		return message; 
	}
	
	@GetMapping("/get")
	public String getOneById(String id){
		
		String message = saOppersonOproleService.findSaOpersonOprole(id);
		return message;
	}
	@PostMapping("/delete")
	public String deleteById(String id){
		String message = saOppersonOproleService.DeleteSaOpersonOprole(id);
		return message;
	}
	
}
