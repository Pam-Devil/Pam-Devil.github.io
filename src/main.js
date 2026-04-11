//TODO: Não usar NODEJS ou implementar algum tipo de servidor.
//TODO: Não usar nenhuma dependencia externa. Reinventar a roda se for preciso.
let toggle = false
let dark_theme = false

let img1 = "../media/img/lain4.gif"
let img2 = "../media/img/lain3.gif"
let img3 = "../media/img/lain5.gif"
let img4 = "../media/img/lain6.gif"

let carrosel_list = [img1, img2, img3, img4]
let carrosel_pointer = 0

function change_theme() {
}

//TODO: Expand this function and the next to receive any generic carrosel
async function move_carrosel(carrosel_list) {
    carrosel_pointer = (++carrosel_pointer) % carrosel_list.length
    await update_carrosel(carrosel_pointer)
}
//* TOFIX: Does this needs to be async?... i feel like it does?
async function update_carrosel(image_id) {
    carrosel_pointer = image_id
    let image_frame = document.getElementById("hero_i_foto")
    image_frame.src = carrosel_list[image_id]
}
//* TOFIX: This name for ths function makes no sense and it sucks. 
function create_template() {
    const body = document.getElementById("i_body")
    toggle = !toggle
    if (!toggle) {
        console.log("toggle on if:", toggle)
        document.getElementById("i_card")?.remove()
        return;
    }
    //TODO: Learn how to use a damn debugger for once
    const template = document.getElementById("i_template")
    const clone = template.content.cloneNode(true)
    console.log("clone:", clone)
    console.log("query:", clone.querySelector(".card"))
    console.log("Template created")
    console.log("toggle:", toggle)
    document.getElementById("decorative_image").appendChild(clone.querySelector(".card"))
    return;
}

/** I think modeling a event system like a matrix works well enough
let event_list = {
    "event1": [sub11, sub12, sub13],
    "event2": [sub21, sub22, sub23],
    "event3": [sub31, sub32, sub33],
}
 */
let event_list = {
    "click": [],
    "radio_click": [],
    "hover": [],
    "change_theme": [],
    "fuck_go_back": [],
}
//NOTE: I Made this custom event system from scratch,
// Because I wanted. And it probably sucks...
// But, eh. Can't be bothered. 
function call_event(event, data = {}) {
    console.log("event called:", event)
    console.log("with data:", data)
    event_list[event].forEach(sub => {
        sub.on_call(data)
    });
}

function subscribe(event, sub) {
    if (!event_list[event]) {

        console.error("Non existent event:", event)
        return;
    }
    if (!event_list[event].includes(sub)) {
        event_list[event].push(sub)
        console.log(`subscribed ${sub} to event ${event}`)
    }
}

function unsubscribe(event, subscriber) {
    if (!event_list[event]) {
        console.error("Unexistent event:", event)
        return;
    }
    //FIXED: assign the filtererd list to the original list
    //FIXED: Do not assing the filtered list to the event object, moron.
    //NOTE: It would be better to return the list to make it a pure function...
    // but eh, cant be bothered.
    event_list[event] = event_list[event].filter(sub => sub !== subscriber)
}
function main() {
    // NOTE: Async main because I feel i will need to call some await there soon. 
    // It doesnt returns anything of importance anyway, so it shouldn't be any bad?
    // You know what? fuck it. I will remove the async. I'm not calling await inside this any soon anyway.
    window.call_event = call_event;
    console.log("hello world");
    let ui_sub = {
        properties: {},
        on_call: async (data) => { await move_carrosel(carrosel_list) }
    }
    let panic_button = {
        on_call: (data) => {
            console.error("PANIC!", data)
            throw new Error("Something went TERRIBLY WRONG. Shut down this crap!")
        }
    }
    let theme_sub = {
        on_call: (data) => {
            //NOTE: Esse codigo tá feio, ruim, e fede a fracasso.
            //NOTE: Mas FUNCIONA. 
            // NOTE: E to sem paciencia nem tempo pra corrigir.
            //NOTE: E to sem paciencia pra pensar em ingles tbm
            console.log("calling theme sub")
            console.log("dom loaded")
            const list = ["dark_mode"]
            console.log("dark mode active?", document.body.classList.contains("dark_mode"))
            list.forEach(item => document.body.classList.toggle(item))
            if (document.body.classList.contains("dark_mode")) {
                dark_theme = true;
                sessionStorage.setItem("dark_theme", String(dark_theme))
            } else {
                dark_theme = false;
                sessionStorage.setItem("dark_theme", String(dark_theme))
            }
            console.log(dark_theme)
        }
    }
    let carrosel = {
        on_call: async (data) => { await update_carrosel(data.value) }
    }
    subscribe("click", ui_sub);
    //Because we all need a panic button sometime
    subscribe("fuck_go_back", panic_button)
    subscribe("radio_click", carrosel)
    subscribe("change_theme", theme_sub)

    unsubscribe("click", panic_button)
    if (!sessionStorage.getItem("has_executed")) {
        console.log("execute only once!!");
        sessionStorage.setItem("has_executed", "true");
    }

    console.log("testing stringfication:", String(false), String(true))

    document.addEventListener('DOMContentLoaded', (event) => {
        console.log('DOM fully loaded and parsed');
        if (sessionStorage.getItem("dark_theme") == "true") {
            console.log("Dark theme is active")
            document.body.classList.add("dark_mode")
        }
        else {
            console.log("light_mode is active")
        }
    });
}
main()

