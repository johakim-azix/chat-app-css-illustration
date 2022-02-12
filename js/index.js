const INCOMING_MSG_TXT_PLACE_HOLDER = "<div id=\"view-template\"  class=\"msg-item incoming placeholder\">\n" +
    "                                       <span></span>\n" +
    "                                       <div class=\"msg\">\n" +
    "                                           <div></div>\n" +
    "                                           <div></div>\n" +
    "                                       </div>\n" +
    "                                  </div>"

const INCOMING_MSG_TXT = "<div id=\"view-template\" class=\"msg-item incoming\">\n" +
    "                        <span></span>\n" +
    "                        <p class=\"msg\"></p>\n" +
    "                     </div>"

let incomingTextMsgPlaceHolder = ""
let incommingPricingItemMsgPlaceHolder = ""
let outgoingImgMsgPlaceHolder = ""


let msgQueue = null
document.addEventListener("DOMContentLoaded", () => {
    msgQueue = document.getElementsByClassName("queue")[0];
    setTimeout(() => {
            startMsgQueueAnimation()
        },
        2000
    )
})

function startMsgQueueAnimation() {
    // first display the incomingMsgTxtPlaceHoler
    renderIncomingMsgTxtItemPlaceHolder()

    //wait 1.5s then add an incomming msh txt item
    setTimeout(() => {
            renderIncomingMsgTxtItem("That sound great. i'd be happy to discuss more.")
        },
        1500
    )

    //wait 2.5s display the second incoming message placeholder incoming
    setTimeout(() => {
            renderIncomingMsgTxtItemPlaceHolder()
        },
        2500
    )
    //
    //wait 4s then add an incomming msh txt item
    setTimeout(() => {
            renderIncomingMsgTxtItem("Could you send over some pictures of your dog. please ?")
        },
        4000
    )
}


function renderIncomingMsgTxtItemPlaceHolder() {
    msgQueue.appendChild(buildIncomingMsgTxtPlaceHolder())
}

function renderIncomingMsgTxtItem(msg) {
    //replace the msg placeholder by a incoming msg item
    msgQueue.replaceChild(buildIncomingMsgTxt(msg), msgQueue.getElementsByClassName("placeholder")[0])
}


function buildIncomingMsgTxtPlaceHolder() {
    //build the corresponding message placeholder
    return createView(INCOMING_MSG_TXT_PLACE_HOLDER)
}

function buildIncomingMsgTxt(msg) {
    //build the corresponding message item
    let view = createView(INCOMING_MSG_TXT)
    view.setAttribute("id", "")
    view.getElementsByClassName("msg")[0].innerText = msg
    return view
}

function createView(viewTemplate) {
    let domParser = new DOMParser()
    return domParser.parseFromString(viewTemplate, "text/html").getElementById("view-template")
}