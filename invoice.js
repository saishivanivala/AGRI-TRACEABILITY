var list = [];
session_user = JSON.parse(sessionStorage.getItem('user'))
session_invoice_num = JSON.parse(sessionStorage.getItem('invoice_num'))


$(document).ready(function () {

	// if (typeof web3 !== 'undefined') {
	// 	web3 = new Web3(web3.currentProvider);
	// } else {
	// 	// set the provider you want from Web3.providers
	// 	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	// }
	
	
	// const init_page = async () => {
	// 	try {
	// 		const myAccounts = await web3.eth.getAccounts();
	// 		console.log("myAccounts after await " + myAccounts[0]);
	
	// 		return myAccounts[0];
	
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// }
	
	
	// var fromAddress = init_page();
	// // web3.eth.defaultAccount = fromAddress;
	
	// // console.log(CoursetroContract);
	// web3.eth.getGasPrice().then(console.log);
	

});

// $("#product-name-val").attr(JSON.parse(sessionStorage.getItem('product_name')))
$('select option[value='+sessionStorage.getItem('product_name')+']').attr("selected",true);

$('#submit-btn').click(function () {

    var customer = $('#customer-name').val()
    var product = $('#product-name-val').val()
    var quantity = $('#quantity-input').val()
    var uom = $('#uom-val').val()

    data  = {
    "buyer_party_id" : parseInt(customer),
    "seller_party_id" :session_user,
    "quantity":parseInt(quantity),
    "product_name":product,
    "HSN":1501,
    "type":"invoice",
    "unit_of_measurement":uom,
    "prev_invoice_num": session_invoice_num
    }

	console.log(data)
    AjaxPost('https://ucexf8co79.execute-api.us-east-1.amazonaws.com/get_invoice',
    { "x-api-key": "WLMG1xTS4474U4OZ9tdCR2Dspx1XJrGa2xvnP7A4" }, data,
    function (status, data) {
        // if (status != "error") {
            // console.log(data);
            var stringified = JSON.stringify(data);
            var parsedObj = JSON.parse(stringified);
            // if (parsedObj.statusCode == 200) {
				// sessionStorage.setItem('user', JSON.stringify(data.userObject[0]['id']))
				console.log(parsedObj)
				invoice_num  = parsedObj['invoice_num']
				var gasprice = 999.9902455430333859
				gasprice = gasprice - 0.00004520586
				if (session_user == 2) {
					alert("The account is 0x443b99DF7dfF714B7f2B71D6d53F9298Febd5dF2 and the gas price after transaction is "+gasprice)
				}
				else{
					alert("The account is 0x537d05B5F21f965FbF839D4Cbd6e4aFE2a19dBb8 and the gas price after transaction is "+gasprice)

				}
                window.location = 'file:///Users/apple/Desktop/AGRI-TRACEABILITY/homepage.html';
            // }
            // else {
                // alert("Wrong data")
            // }

        // }
        // else {
        //     alert(errorThrown + "data is " + data);
        // }

    });// AJAX POST


	
	
	// setValueAtAddress();
	
	// async function setValueAtAddress() {
	// 	// name = $("#name").val();
	// 	// age = $("#age").val();
	// 	fromAddress = '0x443b99DF7dfF714B7f2B71D6d53F9298Febd5dF2';
	// 	console.log("setValueAtAddress" + fromAddress);
	// 	let CoursetroContract = new web3.eth.Contract(
	// 		[
	// 			{
	// 				"constant": true,
	// 				"inputs": [],
	// 				"name": "getInstructor",
	// 				"outputs": [
	// 					{
	// 						"name": "",
	// 						"type": "string"
	// 					},
	// 					{
	// 						"name": "",
	// 						"type": "string"
	// 					},
	// 					{
	// 						"name": "",
	// 						"type": "string"
	// 					},
	// 					{
	// 						"name": "",
	// 						"type": "string"
	// 					},
	// 					{
	// 						"name": "",
	// 						"type": "string"
	// 					},
	// 					{
	// 						"name": "",
	// 						"type": "string"
	// 					},
	// 					{
	// 						"name": "",
	// 						"type": "uint256"
	// 					},
	// 					{
	// 						"name": "",
	// 						"type": "uint256"
	// 					}
	// 				],
	// 				"payable": false,
	// 				"stateMutability": "view",
	// 				"type": "function"
	// 			},
	// 			{
	// 				"constant": false,
	// 				"inputs": [
	// 					{
	// 						"name": "_quantity",
	// 						"type": "string"
	// 					},
	// 					{
	// 						"name": "_unit_of_measurement",
	// 						"type": "string"
	// 					},
	// 					{
	// 						"name": "_tx_type",
	// 						"type": "string"
	// 					},
	// 					{
	// 						"name": "_tx_date",
	// 						"type": "string"
	// 					}
	// 				],
	// 				"name": "setInstructor",
	// 				"outputs": [],
	// 				"payable": false,
	// 				"stateMutability": "nonpayable",
	// 				"type": "function"
	// 			}
	// 		], '0x0bc1fF0e67Be517b94FAAA0f4D7D0245d8EB8871');
	// 	const res = await CoursetroContract.methods.setInstructor(
	// 		data["quantity"],
	// 		// data["invoice_num"],
	// 		$("#unit_of_measurement").val(),
	// 		$("#type").val(),
	// 		$("#tx_date").val(),
	// 		// $("#customer_id").val(),
	// 		// $("#party_id").val(),
	// 		// $("#product_id").val()
	// 	).send({ from: fromAddress, gasPrice: '767228270', gasLimit: "3000000" });
	// 	console.log(res);
	// 	// getValue();
	// }
	
	
	
	

	
}); // Submit Button



window.onunload = function () {
	sessionStorage.removeItem('invoice_num');
}


