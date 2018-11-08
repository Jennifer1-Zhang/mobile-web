(function (w) {
	w.transformCss=function (node,name,value){
			//判断节点是否具有动画效果并加入动画效果
			if(!node.transform){
				node.transform={};
			}
			//判断参数有两个还是三个，两个为读的操作，三个为写的操作
			if(arguments.length>2){
				//写的操作
				//把名值对添加到对象
				node.transform[name]=value;
				//多个动画用for循环
				var result='';
				for(var item in node.transform){
					switch(item){
						case 'skew':
						case 'skewX':
						case 'skewY':
						case 'skewZ':
						result+=item+'('+node.transform[item]+'deg)'
						break;
						case 'scale':
						case 'scaleX':
						case 'scaleY':
						case 'scaleZ':
						result+=item+'('+node.transform[item]+')'
						break;
						case 'rotate':
						case 'rotateX':
						case 'rotateY':
						case 'rotateZ':
						result+=item+'('+node.transform[item]+'deg)'
						break;
						case 'translate':
						case 'translateX':
						case 'translateY':
						case 'translateZ':
						result+=item+'('+node.transform[item]+'px)'
						break;
					}
				}
				node.style.transform=result;
			}else{
				//读
				if(typeof node.transform[name]=="undefined"){
					if(name=='scale'||name=='scaleX'||name=='scaleY'||name=='scaleZ'){
						value=1;
					}else{
						value=0;
					}
				}else{
					value=node.transform[name];
				}
				return value;
			}
		}
})(window)