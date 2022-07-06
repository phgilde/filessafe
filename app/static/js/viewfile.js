function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}
$(document).ready(function () {
	var identifier = window.location.hash;
	console.log(identifier);
	if (!/#[0-9]*-[0-9]*/.test(identifier)) return false;
	var a = identifier.split("-");
	var file_id = a[0].substring(1);
	var password = a[1];
	console.log(password);
	$.ajax({
		url: `/getfile/${file_id}`,
		type: "GET",
		dataType: "json",
		processData: false,
		contentType: false,
		success: function (e) {
			console.log(e);
			var filename = CryptoJS.AES.decrypt(e.name, password).toString(
				CryptoJS.enc.Latin1
			);
			$("#filename").text(filename);
			var file = CryptoJS.AES.decrypt(e.file, password).toString(
				CryptoJS.enc.Latin1
			);
			console.log(filename);
			$("#download").click(function () {
				downloadURI(file, filename);
			});
		},
		async: false,
	});
});
