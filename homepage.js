session_user = JSON.parse(sessionStorage.getItem('user'));
let ledgerdata = [];
var raise_invoice_val
// ledgerdata =
//     [
//         {
//             "quantity": "+100",
//             "unit_of_measurement": "kg",
//             "invoice_num": 571790,
//             "type": "production",
//             "tx_date": "2022-05-06 10:42:26",
//             "party_id": 1,
//             "product_id": 54,
//             "Links_to": null,
//             "customer_id": 1,
//             "product_name": "Millets"
//         },
//         {
//             "quantity": "-50",
//             "unit_of_measurement": "kg",
//             "invoice_num": 3919790,
//             "type": "invoice",
//             "tx_date": "2022-05-06 10:49:34",
//             "party_id": 2,
//             "product_id": 54,
//             "Links_to": 1,
//             "customer_id": 3,
//             "product_name": "Millets"

//         },

//         {
//             "quantity": "-50",
//             "unit_of_measurement": "kg",
//             "invoice_num": 7519790,
//             "type": "invoice",
//             "tx_date": "2022-05-06 10:49:34",
//             "party_id": 3,
//             "product_id": 51,
//             "Links_to": 1,
//             "customer_id": 2,
//             "product_name": "Rice"

//         }

//     ]


$(document).ready(function () {

    sessionStorage.removeItem('invoice_num');
    sessionStorage.removeItem('product_name');

    if (session_user == 3 || session_user==4) {
        $('#add-prod-record-btn').hide();
    }

    AjaxGet('https://q39pc43goc.execute-api.us-east-1.amazonaws.com/get_ledger?party_id=' + session_user,
        { "x-api-key": "WLMG1xTS4474U4OZ9tdCR2Dspx1XJrGa2xvnP7A4" },
        function (status, data) {
            // console.log(data);

            if (status != "error") {
                console.log(data);
                var stringified = JSON.stringify(data);
                var parsedObj = JSON.parse(stringified);
                if (parsedObj.statusCode == 200) {
                    console.log(parsedObj)
                    // console.log(stringified)

                    // ledgerdata = parsedObj['result']

                    // for (var i of parsedObj.result) {
                    //     ledgerdata.push(i);
                    // }
                    // ledgerdata = parsedObj.result

                    ledgerdata = [...parsedObj['result']];
                    console.log(ledgerdata);
                    const product_ids = new Set();
                    for (i in ledgerdata) {
                        product_ids.add(ledgerdata[i].product_id)
                    }


                    // console.log(product_ids)

                    for (j of product_ids) {
                        var x = 0
                        // console.log(x)
                        for (i in ledgerdata) {
                            product = ledgerdata[i]
                            console.log(product)
                            if (j == product.product_id) {
                                if (x == 0) {
                                    var html = ""
                                    html += '<div>' +
                                        '<div class="table-header">' +
                                        '<h4>' + product.product_name + '</h4>' +
                                        '<div class="col-lg-2">' +
                                        '<button id="raise-invoice-btn-' + product.product_id + '" class="btn btn-success btn-lg pull-right" onclick="raiseInvoiceButtonFunction(' + product.product_id + ')" value="' + product.invoice_num + ' ">Raise Invoice</button>' +
                                        '</div>' +
                                        '<div class="qr-code-generator">' +
                                        '<div class="col-lg-2 qrcode" id=qr-code-' + product.product_id + '>' +
                                        '</div>' +
                                        '</div>' +
                                        '</div>' +
                                        '<br>' +
                                        '<div class="container row">' +

                                        '<div class="col-lg-10">' +
                                        '<table id="product-table-' + product.product_id + '"class="table table-hover table-bordered">' +
                                        '<thead>' +
                                        '<tr>' +
                                        '<th>Date</th>' +
                                        '<th>Invoice Number</th>' +
                                        '<th>Customer</th>' +
                                        // '<th>Opening Balance</th>'+
                                        '<th># Recieved</th>' +
                                        '<th># Issued</th>' +
                                        // '<th>Closing Balance</th>'+
                                        '</tr>' +
                                        '</thead>' +
                                        '<tbody>';
                                    // console.log(html)
                                    x = 1;
                                }
                                html += '<tr>' +
                                    '<td>' + product.tx_date + '</td>' +
                                    '<td>' + product.invoice_num + '</td>' +
                                    '<td>' + product.customer_id + '</td>';
                                if (product.quantity.includes("+")) {
                                    html += '<td>' + product.quantity.slice(1,) + '</td>' +
                                        '<td>0</td>';
                                }
                                else {
                                    if (session_user == product.party_id) {
                                        html += '<td>0</td>' +
                                            '<td>' + product.quantity.slice(1,) + '</td>';
                                    }

                                    else {
                                        html += '<td>' + product.quantity.slice(1,) + '</tssd>' +
                                            '<td>0</td>';
                                    }

                                }
                                '</tr>';

                            }

                        }

                        html += '</tbody>' +
                            '</table>' +
                            '</div>' +
                            '</div>' +
                            '</div>';


                        $("#product-list").append(html)



                    }

                    for (j of product_ids) {
                        var inv_num = $('#product-table-' + j + ' tr:last').find('td:eq(1)').text();

                        console.log(inv_num, product.product_name)
                        $('#raise-invoice-btn-' + j).attr("value", inv_num);
                        $('#raise-invoice-btn-' + j).attr("name", product.product_name);

                        // raise_invoice_val = $('#raise-invoice-btn-' + j).val()
                        $('#qr-code-' + j).qrcode({ width: 64, height: 64, text: 'https://mobigesture.com/trace.html?invoice_num=' + inv_num });

                        
                    }

                    //     sessionStorage.setItem('user', JSON.stringify(data.userObject[0]['id']))
                    //     window.location = 'file:///Users/apple/Desktop/AGRI-TRACEABILITY/homepage.html';
                }
                else {
                    alert("Wrong data")
                }
            }
            else {
                alert(errorThrown + "data is " + data);
            }




        });// AJAX GET




}); // DOCUMENT READY



// $("#raise-invoice-btn").click(function () {
//     // console.log($('#raise-invoice-btn').attr("value"))
//     // sessionStorage.setItem('invoice_num', $('#raise-invoice-btn').attr("value"))
//     window.location = 'file:///Users/apple/Desktop/AGRI-TRACEABILITY/invoice.html'
// });


const raiseInvoiceButtonFunction = (product_id) => {
    console.log()
    // // sessionStorage.setItem('invoice_num', $('#raise-invoice-btn').attr("value"))
    raise_invoice_val = $('#raise-invoice-btn-' + product_id).val()
    prod_name_val = $('#raise-invoice-btn-' + product_id).attr("name")



    sessionStorage.setItem('invoice_num', raise_invoice_val)
    sessionStorage.setItem('product_name', prod_name_val)


    window.location = 'file:///Users/apple/Desktop/AGRI-TRACEABILITY/invoice.html'
}


$('#logout').click(function () {

    sessionStorage.clear();
    window.location = 'file:///Users/apple/Desktop/AGRI-TRACEABILITY/login.html'


});// LOGOUT