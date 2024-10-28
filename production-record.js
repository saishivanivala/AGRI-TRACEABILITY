var list = [];
session_user = JSON.parse(sessionStorage.getItem('user'))
session_invoice_num = JSON.parse(sessionStorage.getItem('invoice_num'))

$(document).ready(function () {


	// $('[data-toggle="tooltip"]').tooltip();
	// var actions = $("table td:last-child").html();


	// Append table with add row form on add new button click
	// $(".add-new").click(function () {
	// 	$(this).attr("disabled", "disabled");
	// 	var index = $("table tbody tr:last-child").index();
	// 	var row = '<tr>' +
	// 		'<td><input type="text" class="form-control" name="name" id="name"></td>' +
	// 		'<td><input type="text" class="form-control" name="department" id="department"></td>' +
	// 		'<td><input type="text" class="form-control" name="phone" id="phone"></td>' +
	// 		'<td>' + actions + '</td>' +
	// 		'</tr>';
	// 	$("table").append(row);
	// 	$("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
	// 	$('[data-toggle="tooltip"]').tooltip();
	// });

	// // Add row on add button click
	// $(document).on("click", ".add", function () {
	// 	var empty = false;
	// 	var input = $(this).parents("tr").find('input[type="text"]');
	// 	input.each(function () {
	// 		if (!$(this).val()) {
	// 			$(this).addClass("error");
	// 			empty = true;
	// 		} else {
	// 			$(this).removeClass("error");
	// 		}
	// 	});
	// 	$(this).parents("tr").find(".error").first().focus();
	// 	if (!empty) {
	// 		input.each(function () {
	// 			$(this).parent("td").html($(this).val());
	// 		});
	// 		$(this).parents("tr").find(".add, .edit").toggle();
	// 		$(".add-new").removeAttr("disabled");
	// 	}
	// });

	// // Edit row on edit button click
	// $(document).on("click", ".edit", function () {
	// 	$(this).parents("tr").find("td:not(:last-child)").each(function () {
	// 		$(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
	// 	});
	// 	$(this).parents("tr").find(".add, .edit").toggle();
	// 	$(".add-new").attr("disabled", "disabled");
	// });

	// Delete row on delete button click
// 	$(document).on("click", ".delete", function () {
// 		$(this).parents("tr").remove();
// 		$(".add-new").removeAttr("disabled");
// 	});

});

$('#submit-btn').click(function () {


    // var customer = $('#customer-name').val()
    var product = $('#product-name-val').val()
    var quantity = $('#quantity-input').val()
    var uom = $('#uom-val').val()

    data  = {
    "buyer_party_id" : session_user,
    "seller_party_id" :session_user,
    "quantity":quantity,
    "product_name":product,
    "HSN":1501,
    "type":"production",
    "unit_of_measurement":uom,
    "prev_invoice_num": session_invoice_num
    }

    AjaxPost('https://ucexf8co79.execute-api.us-east-1.amazonaws.com/get_invoice',
    { "x-api-key": "WLMG1xTS4474U4OZ9tdCR2Dspx1XJrGa2xvnP7A4" }, data,
    function (status, data) {
        if (status != "error") {
            console.log(data);
            var stringified = JSON.stringify(data);
            var parsedObj = JSON.parse(stringified);
            if (parsedObj.statusCode == 200) {
                // sessionStorage.setItem('user', JSON.stringify(data.userObject[0]['id']))
                window.location = 'file:///Users/apple/Desktop/AGRI-TRACEABILITY/homepage.html';
            }
            else {
                alert("Wrong data")
            }
        }
        else {
            alert(errorThrown + "data is " + data);
        }

    });// AJAX POST

	// var list = $(this).find(".customerIDCell").html();    

	// var table = document.getElementById('prod-rec-table'),
	// 	rows = table.getElementsByTagName('tr'),
	// 	i, j, cells, customerId;

	// for (i = 0, j = rows.length; i < j; ++i) {
	// 	cells = rows[i].getElementsByTagName('td');
	// 	if (!cells.length) {
	// 		continue;
	// 	}
	// 	customerId = cells[0].innerHTML;
	// }

	// for(i=0;i<cells.length;i++)
	// {
	// 	if(i%3==0 && i>0)
	// 	continue;
	// 	else
	// 	list.push(cells[i].innerHTML);
	// }
	// console.log(cells[0].innerHTML,"-----------------------",list);
	// alert(customerId)

	
});







