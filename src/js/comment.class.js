comment = {
	id:0,
	load:function(){
		CommentNum(window.id);
		return "执行成功";
	},
    error: function(argument) {
    	$("#comment_error").show();
        return "执行成功";
    }
};
