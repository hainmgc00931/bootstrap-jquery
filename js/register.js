var MEMBER_API_URL = "https://youtube-api-challenger.appspot.com/members";
var AUTHENTICATION_API_URL = "https://youtube-api-challenger.appspot.com/authentication";

$( document ).ready(function() {
    $("#btnSubmit").click(function(){
    	handleRegister();    	
    });
});

function handleRegister() {
	// 1. Lấy dữ liệu từ input.
	// $("#username").val();
	var username = $("#register-form input[name='username']").val();
	var email = $("#register-form input[name='email']").val();
	var password = $("#register-form input[name='password']").val();

	// 2. Validate dữ liệu. Gọi đến hàm validateRegisterForm().

	// 3. Gửi dữ liệu lên api.
	// 3.1 Tạo data gửi lên.
	var dataToSend = {
		"data": {
			"type": "Member",
			"attributes": {
				"username": username,
				"email": email,
				"password": password,	
			}
		}
	}

	$.ajax({
		url: MEMBER_API_URL,
		data: JSON.stringify(dataToSend),
		type: "POST",
		success: function(data){
			$("#alert-success").text("Registry success.");
			$("#alert-error").text("");
			$("#alert-error").hide();			
			$("#alert-success").show();
			resetForm();
		},
		error: function(request, status, error){
			var resp = JSON.parse(request.responseText);
			$("#alert-success").text("");
			$("#alert-success").hide();	
			$("#alert-error").text(resp.errors[0].title + " " + resp.errors[0].detail);
			$("#alert-error").show();			
		}
	});
}

function resetForm(){
	$("#register-form input[name='username']").val("");
	$("#register-form input[name='email']").val("");
	$("#register-form input[name='password']").val("");
}

function validateRegisterForm(){
	return false;
}