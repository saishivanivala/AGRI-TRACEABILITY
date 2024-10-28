// session_invoice_num=""

header = {}

function AjaxGet(url, header = {}, callBack) {
  return $.ajax({
    url: url,
    dataType: "json",
    type: "GET",
    contentType: 'application/json',
    "headers": header,
    success: function (data, textStatus, xhr) {
      return callBack("success", data); // return callBack() with data
    },
    error: function (xhr, textStatus, errorThrown) {
      return callBack("error", ""); // return callBack() with error
    },
  });
}

session_user = JSON.parse(sessionStorage.getItem('user'));
var inv_num;
(function () {
    function VerticalTimeline(element) {
        this.element = element; this.blocks = this.element.getElementsByClassName("cd-timeline__block");
        this.images = this.element.getElementsByClassName("cd-timeline__img");
        this.contents = this.element.getElementsByClassName("cd-timeline__content");
        this.offset = 0.8; this.hideBlocks();
    };
    VerticalTimeline.prototype.hideBlocks = function () {

        if (!"classList" in document.documentElement) {
            return;
        }
        var self = this;
        for (var i = 0; i < this.blocks.length; i++) {
            (function (i) {
                if (self.blocks[i].getBoundingClientRect().top > window.innerHeight * self.offset) {
                    self.images[i].classList.add("cd-timeline__img--hidden");
                    self.contents[i].classList.add("cd-timeline__content--hidden");
                }
            })
                (i);
        }
    };
    VerticalTimeline.prototype.showBlocks = function () {

        if (!"classList" in document.documentElement) {
            return;
        }
        var self = this;
        for (var i = 0; i < this.blocks.length; i++) {
            (function (i) {
                if (self.contents[i].classList.contains("cd-timeline__content--hidden") && self.blocks[i].getBoundingClientRect().top <= window.innerHeight * self.offset) {
                    self.images[i].classList.add("cd-timeline__img--bounce-in"); self.contents[i].classList.add("cd-timeline__content--bounce-in"); self.images[i].classList.remove("cd-timeline__img--hidden"); self.contents[i].classList.remove("cd-timeline__content--hidden");
                }
            })(i);
        }
    };
    var verticalTimelines = document.getElementsByClassName("js-cd-timeline"), verticalTimelinesArray = [], scrolling = false;
    if (verticalTimelines.length > 0) {
        for (var i = 0; i < verticalTimelines.length; i++) {
            (function (i) {
                verticalTimelinesArray.push(new VerticalTimeline(verticalTimelines[i]));
            })
                (i);
        }
        window.addEventListener("scroll", function (event) {
            if (!scrolling) {
                scrolling = true; (!window.requestAnimationFrame) ? setTimeout(checkTimelineScroll, 250) : window.requestAnimationFrame(checkTimelineScroll);
            }
        });
    }
    function checkTimelineScroll() {
        verticalTimelinesArray.forEach(function (timeline) {
            timeline.showBlocks();
        });
        scrolling = false;
    };
})();


const urlParams = new URLSearchParams(window.location.search);
const invoice_num = urlParams.get('invoice_num');
console.log(invoice_num)

AjaxGet('https://0d0804oob6.execute-api.us-east-1.amazonaws.com/trace?invoice_num='+invoice_num,
    { "x-api-key": "WLMG1xTS4474U4OZ9tdCR2Dspx1XJrGa2xvnP7A4" },
    function (status, data) {
        if (status != "error") {
            console.log(data);
            var stringified = JSON.stringify(data);
            var parsedObj = JSON.parse(stringified);
            ledgerdata = [...parsedObj['result']];

            // ledgerdata.reverse()

            for (tx of ledgerdata) {
                console.log(tx)

                if (session_user == tx.customer_id) {
                    var customer_name = 'SELF'
                }
                else {
                    customer_name = tx.customer_id
                }
                var html = ''

                html += '<div class="cd-timeline__block" >' +
                    '<div class="cd-timeline__img cd-timeline__img--picture">' +
                    '<img src="cd-icon-location.svg" alt="Picture">' +
                    '</div>' +
                    '<div class="cd-timeline__content text-component">' +
                    '<h2>Customer: ' +
                    customer_name +
                    '</h2>' +
                    '<p class="color-contrast-medium">' +
                    tx.tx_date +
                    '</p>' +
                    '<p class="color-contrast-medium">' +
                    tx.quantity.slice(1,) + tx.unit_of_measurement
                    '</p>' +
                    '</div>' +
                    '</div>'+
                    '</div>';
                    $("#timeline-container").append(html)
                // else {
                //     alert("Wrong data")
                // }
            }

            


        }
        else {
            alert(errorThrown + "data is " + data);
        }



    });// AJAX GET


