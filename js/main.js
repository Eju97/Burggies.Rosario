fetch('producto.json')
.then(response => response.json())
.then(data => {
    document.getElementById('output').innerText = JSON.stringify(data, null, 2);
})
.catch(error => console.error('Error:', error));
    $(document).ready(function () {
    if("CARRITO" in localStorage){
        const arrayLiterales = JSON.parse(localStorage.getItem("CARRITO"));
        for (const literal of arrayLiterales) {
            carrito.push(new Medallon(literal.id, literal.nombre, literal.precio, literal.cantidad, literal.imagen));
        }
        carritoUI(carrito);
    }

    $(".dropdown-menu").click(function (e) {
        e.stopPropagation();
    });

    $.get("data/producto.json", function(datos, estado){
        if(estado == 'success'){
            for (const literal of datos){
                medallones.push(new Medallon(literal.id, literal.nombre, literal.precio, literal.cantidad, literal.imagen));
            }
        }
        medallonesUI(medallones, '#productosContenedor');
    });
});

window.addEventListener('load',()=>{
    $('#indicadorCarga').remove();
    $('#productosContenedor').fadeIn("slow");
})

$("#btn-oferta").click(function(e){
    $("#oferta").slideToggle();
});