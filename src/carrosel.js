let img1 = "../media/img/lain4.gif"
let img2 = "../media/img/lain3.gif"
let img3 = "../media/img/lain5.gif"
let img4 = "../media/img/lain6.gif"

export let carrosel_list = [img1, img2, img3, img4]
export let carrosel_pointer = 0

//TODO: Expand this function and the next to receive any generic carrosel
export async function move_carrosel(carrosel_list) {
    carrosel_pointer = (++carrosel_pointer) % carrosel_list.length
    await update_carrosel(carrosel_pointer)
}
//* TOFIX: Does this needs to be async?... i feel like it does?
export async function update_carrosel(image_id) {
    carrosel_pointer = image_id
    let image_frame = document.getElementById("i_foto")
    image_frame.src = carrosel_list[image_id]
}

