(function (w){
	w.webkitScroll=function (wrap,callback){
		// var wrap=document.getElementById('wrap');
		var content=wrap.children[1];
		transformCss(content,'translateZ',0.01)
		var start=0;
		var eleY=0;
		var beginTime=0,beginValue=0,endTime=0,endValue=0,disTime=1,disValue=0;
		wrap.addEventListener('touchstart',function (event){
			var touch=event.changedTouches[0];
			disValue=0;//解决点二次开始点击残留speed的bug
			startY=touch.clientY;
			eleY=transformCss(content,'translateY');
			beginTime=new Date().getTime();
			beginValue=eleY;
			if(callback&&callback['start']){
				callback['start']();
			}
		})
		wrap.addEventListener('touchmove',function (event){
			var touch=event.changedTouches[0];
			var nowY=touch.clientY;
			var disY=nowY-startY;
			var translateY=eleY+disY;
			var minY=document.documentElement.clientHeight-content.offsetHeight;
			if(translateY>0){
				// translateY=0;
				var scale=1-translateY/document.documentElement.clientHeight;
				translateY=translateY*scale;
			}else if(translateY<minY){
				// translateY=document.documentElement.clientHeight-content.offsetHeight;
				var overY=minY-translateY;
				var scale=1-overY/document.documentElement.clientHeight;
				translateY=minY-overY*scale
			}
			transformCss(content,'translateY',translateY);
			endTime=new Date().getTime();
			endValue=translateY;
			disTime=endTime-beginTime;
			disValue=endValue-beginValue;

			if(callback&&callback['move']){
				callback['move']();
			}
		})
		wrap.addEventListener('touchend',function (event){
			var touch=event.changedTouches[0];
			var speed=disValue/disTime;
			var target=transformCss(content,'translateY')+speed*100;
			var minY=document.documentElement.clientHeight-content.offsetHeight
			if(target>0){
				target=0;
			}else if(target<minY){
				target=minY;
			}
				content.style.transition='1s';
			transformCss(content,'translateY',target)	

			if(callback&&callback['end']){
				callback['end']();
			}
		})
	}
})(window)