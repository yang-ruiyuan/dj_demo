let app = {
    //onclick="app.changeStatus(this,'comment','status','id')"
    changeStatus:function(el,collectionName,attr,id){
        $.get('/mpage/changeStatus',{collectionName:collectionName,attr:attr,id:id},function(data){
            if(data.seccess){
                
            }
        })
    }
}