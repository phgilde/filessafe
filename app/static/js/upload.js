$(document).ready(function () {
	$("#submitfile").click(function () {
		var file_input = $("#fileselected").get(0);
		if (file_input.files.length != 1) {
			alert("Please select a file first!");
			return false;
		}
		var file = file_input.files[0];

		if (file.size > 1024 * 1024) {
			alert("The upload limit is 1MB!");
			return false;
		}
		var password = "";
		var filename = "";
		for (i = 0; i < 10; i++) {
			password += Math.floor(Math.random() * 10);
			filename += Math.floor(Math.random() * 10);
		}

		var reader = new FileReader();

		reader.onload = function (e) {
			console.log("encrypting...");
			var encrypted = CryptoJS.AES.encrypt(reader.result, password);
            console.log(file.name);
            var filename_crypt = CryptoJS.AES.encrypt(file.name, password); 
			console.log("Done!");
			var data = new FormData();
			data.append("encryptedfile", encrypted);
			data.append("filename", filename);
            data.append("filename_crypt", filename_crypt);
            console.log("filename_crypt");
            console.log(filename_crypt);
			$.ajax({    
				url: "/upload",
				type: "POST",
				dataType: "json",
				data: data,
				processData: false,
				contentType: false,
				success: function (e) {},
				async: false,
			});
			$(location).attr("href", `/viewfile#${filename}-${password}`);
		};
		reader.readAsDataURL(file);
	});
});
