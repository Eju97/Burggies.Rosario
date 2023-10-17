function medallonesUI(medallones, id){
    $(id).empty();
    for (const medallon of medallones) {
      $(id).append(`<div class="card text-center" style="width: 18rem;">
                        <img src="${medallon.imagen}" class="card-img-top img-fluid card-ajustador" alt="MEDALLONES VEGETARIANOS">
                        <div class="card-body">
                          <h5 class="card-title">${medallon.nombre}</h5>
                          <p class="card-text">$ ${medallon.precio}</p>
                          <a href="#" id='${medallon.id}' class="btn btn-success btn-compra">Añadir</a>
                        </div>
                      </div>`);
    }
    $('.btn-compra').on("click", agregarMedallon);
  }

  function agregarMedallon(e){
    e.preventDefault();
    e.stopPropagation();
    const idProducto   = e.target.id;
    const seleccionado = carrito.find(p => p.id == idProducto);
    if(seleccionado == undefined){
      carrito.push(medallones.find(p => p.id == idProducto));
    }else{
      seleccionado.agregarCantidad(1);
    }
    localStorage.setItem("CARRITO",JSON.stringify(carrito));
    carritoUI(carrito);
  }


function carritoUI(medallones){
    $('#carritoCantidad').html(medallones.length);
    $('#carritoProductos').empty();
    for (const medallon of medallones) {
      $('#carritoProductos').append(registroCarrito(medallon));
    }
    $('#carritoProductos').append(`<p id="totalCarrito"> TOTAL: $ ${totalCarrito(medallones)}</p>`);
    $('.btn-delete').on('click', eliminarCarrito);
    $('.btn-add').click(addCantidad);
    $('.btn-sub').click(subCantidad);

  }

  function registroCarrito(medallon){
    return `
              <p> ${medallon.nombre}
              <span class="badge badge-warning badge-font-size:.75em;">$ ${medallon.precio}</span>
              <span class="badge badge-dark"> ${medallon.cantidad}</span>
              <span class="badge badge-success">$ ${medallon.subtotal()}</span>
              <a id="${medallon.id}" class="btn btn-info btn-add">AGREGAR</a>
              <a id="${medallon.id}" class="btn btn-warning btn-sub">QUITAR</a>
              <a id="${medallon.id}" class="btn btn-danger  btn-delete">ELIMINAR</a>
              </p>
`
  }

  function eliminarCarrito(e){
    let posicion = carrito.findIndex(p => p.id == e.target.id);
    carrito.splice(posicion, 1);
    carritoUI(carrito);
    localStorage.setItem("CARRITO",JSON.stringify(carrito));
  }

  function addCantidad(){
    let medallon = carrito.find(p => p.id == this.id);
    medallon.agregarCantidad(1);
    $(this).parent().children()[1].innerHTML = medallon.cantidad;
    $(this).parent().children()[2].innerHTML = medallon.subtotal();

    $("#totalCarrito").html(`TOTAL: $ ${totalCarrito(carrito)}`);

    localStorage.setItem("CARRITO",JSON.stringify(carrito));
  }

  function subCantidad(){
    let medallon = carrito.find(p => p.id == this.id);
    if(medallon.cantidad > 1){
        medallon.agregarCantidad(-1);
      let registroUI = $(this).parent().children();
      registroUI[1].innerHTML = medallon.cantidad;
      registroUI[2].innerHTML = medallon.subtotal();

      $("#totalCarrito").html(`TOTAL: $ ${totalCarrito(carrito)}`);

      localStorage.setItem("CARRITO",JSON.stringify(carrito));
    }
  }

  function totalCarrito(carrito){
    let total = 0;
    carrito.forEach(p => total += p.subtotal());
    return total.toFixed(2);
  }