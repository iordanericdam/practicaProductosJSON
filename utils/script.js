document.addEventListener("DOMContentLoaded", function () {
  const productList = document.getElementById("lista_productos");
  let select = document.querySelector("#select");
  const btnSelect = document.querySelector("#btnSelect");
  /* const selectMarca = document.querySelector("#selectMarca"); */
  const selectCategoria = document.querySelector("#selectCategoria");
  const marcaSeleccionada = document.querySelector("#selectMarca");
  let cesta = [];
  const listaCesta = document.querySelector("#lista_cesta");
  function añadirProductoCesta(producto) {
    console.log("traza añadirProductoCesta" + producto);
  }

  function mostrarProducto(item, productList) {
    productList.innerHTML += `<div class="card col-2 m-2" style="width: 18rem;">
        </br>
        <img src="${item.thumbnail}" class="card-img-top" alt="Imagen de producto">
        <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">${item.description}</p>
            <p class="card-text">Precio: ${item.price}€</p>
            <a onclick="añadirProductoCesta('${item.title}')" class="btn btn-primary">Añadir a la cesta</a>
        </div>
    </div>`;
  }
  function filtrarProductosPorCategoria(categoriaSeleccionada) {
    return productos.filter(function (producto) {
      return producto.category === selectCategoria.value;
    });
  }

  btnSelect.addEventListener("click", (e) => {
    switch (select.value) {
      case "all":
        productList.innerHTML = "";
        productos.forEach((productos) =>
          mostrarProducto(productos, productList)
        );
        break;
      case "precioMinimo":
        productList.innerHTML = "";
        const productosOrdenados = [...data.products];
        productosOrdenados.sort((a, b) => a.price - b.price);
        productosOrdenados.forEach((item) =>
          mostrarProducto(item, productList)
        );
        break;
      case "categoria":
        productList.innerHTML = "";
        filtrarProductosPorCategoria(selectCategoria.value).forEach((item) => {
          mostrarProducto(item, productList);
        });
        break;
      case "marca":
        productList.innerHTML = "";
        filtrarProductosPorMarca(selectMarca.value).forEach((item) => {
          mostrarProducto(item, productList);
        });
        selectMarca.value = "";
        break;
    }
  });

  function filtrarProductosPorMarca(marcaSeleccionada) {
    return productos.filter(function (producto) {
      return producto.brand.includes(marcaSeleccionada);
    });
  }

  select.addEventListener("change", (e) => {
    if (select.value == "marca") {
      console.log(selectMarca);
      selectCategoria.style.display = "none";
      selectMarca.style.display = "inline";
    } else if (select.value == "categoria") {
      selectCategoria.style.display = "inline";
      selectMarca.style.display = "none";
    } else {
      selectMarca.style.display = "none";
      selectCategoria.style.display = "none";
    }
  });

  fetch("https://dummyjson.com/products")
    .then((response) => response.json())
    .then((data) => {
      const productos = data.products;

      productos.forEach((productos) => mostrarProducto(productos, productList));
      cesta.forEach((cesta) => mostrarProducto(cesta, listaCesta));
      console.log(cesta);
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
    });
});
