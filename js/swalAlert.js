export function swalAlert(title, text, icon) {
    Swal.fire({
        icon,
        title,
        text
    });
    return;
}