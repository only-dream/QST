/**
 * 
 */
package Ernest.until;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 递归分层
 * @author Ernest
 *
 */
public class RecursiveHierarchy {
	
	/**
	 * 获取层级的递归方法
	 * 
	 * @param list 要处理的数据List
	 * @param map 返回的数据key:返回的名称value：数据的名称
	 * @param Parentmap 父子关联key：父value：子
	 * @param number 填1对应obj为null,大于1时填Parentmap当前关联的子一般为当前行主键
	 * @param tier 与number的差值为层数(注：tier>number)最多层数
	 * @param obj 当前层的关联（子）和number有关 null
	 * @return 返回List
	 * 
	 */
	 
	public static List<Map<String, Object>> getChildren(List<Map<String, Object>> list,Map<String ,String> map,Map<String ,String> Parentmap,int number,int tier,Object obj){
		List<Map<String, Object>> list1 = new ArrayList<Map<String,Object>>();
		int number1=number+1;
		boolean falge = true;
		if(list==null){
			falge=false;
		}
		if(map==null){
			falge=false;
		}
		if(Parentmap==null){
			falge=false;
		}
		if(number<0){
			falge=false;
		}
		if(tier<0){
			falge=false;
		}
		if(number>tier){
			falge=false;
		}
		if(falge){
			Object ParentID=null;
			Object ID = null;
			String a=null;
			for(String key:Parentmap.keySet()){
				a=key;
			}
			for(int i = 0;i<list.size();i++){
				Map<String ,Object> map2 = new HashMap<String, Object>();
					for(String key : map.keySet()){
						map2.put(key,list.get(i).get(map.get(key)));
					}
					ParentID=map2.get(a);
					ID = map2.get(Parentmap.get(a));
				if(number==1){
					
					if(ParentID==null||"".equals(ParentID)){
						List<Map<String, Object>> children=null;
						Map<String,Object> map1 = new HashMap<String, Object>(); 
						if(tier>=number1){
							children = getChildren(list,map,Parentmap,number1,tier,ID);
						}
						for(String key : map.keySet()){
							if("sName".equals(key)){
								map1.put(key,map2.get(key)==null?"":map2.get(key));
							}else{
								map1.put(key,map2.get(key));
							}
						}
						map1.put("children", children);
						list1.add(map1);
					}
				}else{
					
					if(obj.equals(ParentID)){
						Map<String,Object> map1 = new HashMap<String, Object>(); 
						List<Map<String, Object>> children=null;
						if(tier>=number1){
							children = getChildren(list,map,Parentmap,number1,tier,ID);
						}
						
						for(String key : map.keySet()){
							if("sName".equals(key)){
								map1.put(key,map2.get(key)==null?"":map2.get(key));
							}else{
								map1.put(key,map2.get(key));
							}
						}
						map1.put("children", children);
						list1.add(map1);
					}
				}
				
			};
		}
		
		return list1;
	}; 
	
}
