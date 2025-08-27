document.addEventListener("DOMContentLoaded", () => {
  const cartKey = "shoppingCart";

  function getCart() {
    return JSON.parse(localStorage.getItem(cartKey)) || [];
  }

  function saveCart(cart) {
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }

  function addToCart(product) {
    let cart = getCart();
    let existing = cart.find(item => item.name === product.name);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({...product, qty: 1});
    }

    saveCart(cart);
    alert(product.name + " added to cart!");
  }

  document.querySelectorAll(".ag").forEach(btn => {
    btn.addEventListener("click", () => {
      const productCard = btn.closest(".ab");

      const image = productCard.querySelector("img.ac").src; 
      const name = productCard.querySelector("p").innerText.trim();
      const price = parseFloat(
        productCard.querySelector(".af p").innerText.replace("$", "").trim()
      );

      addToCart({ name, price, image });
    });
  });

  if (document.querySelector("#cart-table")) {
    renderCart();
  }

  function renderCart() {
    let cart = getCart();
    const tbody = document.querySelector("#cart-table tbody");
    tbody.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      let subtotal = item.price * item.qty;
      total += subtotal;

      let row = document.createElement("tr");
      row.innerHTML = `
        <td><button class="remove" data-index="${index}">X</button></td>
        <td><img src="${item.image}" width="60"></td>
        <td>${item.name}</td>
        <td>$${item.price}</td>
        <td><input type="number" min="1" value="${item.qty}" data-index="${index}" style="width:50px"></td>
        <td>$${subtotal}</td>
      `;
      tbody.appendChild(row);
    });

    document.getElementById("total").textContent = "Total: $" + total;


    tbody.querySelectorAll(".remove").forEach(btn => {
      btn.addEventListener("click", () => {
        let cart = getCart();
        cart.splice(btn.dataset.index, 1);
        saveCart(cart);
        renderCart();
      });
    });

    tbody.querySelectorAll("input[type=number]").forEach(input => {
      input.addEventListener("change", () => {
        let cart = getCart();
        cart[input.dataset.index].qty = parseInt(input.value);
        saveCart(cart);
        renderCart();
      });
    });
  }
});
