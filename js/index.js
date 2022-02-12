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

const OUTGOING_MSG_TXT = "<div id=\"view-template\" class=\"msg-item outgoing\">\n" +
    "                         <span></span>\n" +
    "                         <p class=\"msg\"></p>\n" +
    "                     </div>"

const MSG_FIELD_SENTENCE_ITEM = "<div id='sentence-view-template' class='msg-field-sentence-item'>" +
    "<div class='content'></div>" +
    "<div class='mask'></div>" +
    "</div>"

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

    //wait 4s then add an incomming msh txt item
    setTimeout(() => {
            renderIncomingMsgTxtItem("Could you send over some pictures of your dog. please ?")
        },
        4000
    )

    setTimeout(() => {
        firstOutgoingMsgtypingAnimation(["Here are few pictures. ", " She'is a happy girl."])
    }, 5000)

    setTimeout(() => {
        secondOutgoingMsgtypingAnimation(["Can you make it?"])
    }, 11000)
}


//============== outgoing thext animations =======================
function firstOutgoingMsgtypingAnimation(sentences) {
    let msgField = document.getElementsByClassName("msg-field")[0]
    msgField.innerText = ""
    sentences.forEach((sentence, index) => {
        let msgFieldSentenceItem = createView(MSG_FIELD_SENTENCE_ITEM)
        msgFieldSentenceItem.setAttribute("id", "sentence-item-" + index)
        msgField.appendChild(msgFieldSentenceItem)
        msgFieldSentenceItem = document.getElementById("sentence-item-" + index)
        msgFieldSentenceItem.getElementsByClassName("content")[0].innerText = sentence
        if (index === 0) msgFieldSentenceItem.getElementsByClassName("mask")[0].classList.add("typing")
     })

    setTimeout(() => {
        msgField.style = "height:fit-content"
    }, 2500)

    setTimeout(() => {
        msgField.getElementsByClassName("msg-field-sentence-item")[1].getElementsByClassName("mask")[0].classList.add("typing")
    }, 3000)

    //todo : wait 1s simulate the click on the send message btn


    //todo : wait .5s then add the corresponding message item in the msgQueue
    setTimeout(() => {
        renderOutgoingMsgTxtItem(msgField.innerText.toString())
        msgField.innerHTML="Type amessage..."
    }, 5300)
}

function secondOutgoingMsgtypingAnimation(sentences) {
    let msgField = document.getElementsByClassName("msg-field")[0]
    msgField.innerText = ""
    sentences.forEach((sentence, index) => {
        let msgFieldSentenceItem = createView(MSG_FIELD_SENTENCE_ITEM)
        msgFieldSentenceItem.setAttribute("id", "sentence-item-" + index)
        msgField.appendChild(msgFieldSentenceItem)
        msgFieldSentenceItem = document.getElementById("sentence-item-" + index)
        msgFieldSentenceItem.getElementsByClassName("content")[0].innerText = sentence
        msgFieldSentenceItem.getElementsByClassName("mask")[0].classList.add("typing")
    })

    // setTimeout(() => {
    //     msgField.style = "height:fit-content"
    // }, 2500)

    // setTimeout(() => {
    //     msgField.getElementsByClassName("msg-field-sentence-item")[1].getElementsByClassName("mask")[0].classList.add("typing")
    // }, 3000)

    //todo : wait 1s simulate the click on the send message btn


    //todo : wait .5s then add the corresponding message item in the msgQueue
    setTimeout(() => {
        renderOutgoingMsgTxtItem(msgField.innerText.toString())
        msgField.innerHTML="Type amessage..."
    }, 2300)
}

function renderOutgoingMsgTxtItem(msg) {
    msgQueue.appendChild(buildOutgoingMsgTxt(msg))
}

function buildOutgoingMsgTxt(msg) {
    let view = createView(OUTGOING_MSG_TXT)
    view.setAttribute("id", "")
    view.getElementsByClassName("msg")[0].innerText = msg
    return view
}


//=========== first two incoming animation ========================
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
    let view = domParser.parseFromString(viewTemplate, "text/html")
    if (view.getElementById("view-template") !== null) return view.getElementById("view-template")
    return view.getElementById("sentence-view-template")
}