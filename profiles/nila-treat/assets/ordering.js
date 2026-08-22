    function sadhyaCount() {
      // const input = document.querySelector('input[placeholder="1"]');
      const input = document.querySelector('#sadhyaCount');
      const value = parseInt(input.value) || 1;
      console.log("Onam Sadhya quantity:", value);
      const summarySadhyaCount = document.querySelector('#summarySadhyaCount');
      summarySadhyaCount.textContent = value; // Assuming each order is for 5 people
      // You can add more logic here to update the order summary or total price
    }
    function addToOrderSadhya(element,event) {
      const input = document.querySelector('#sadhyaCount');
      // const value = parseInt(input.value) || 1;
      const value = parseInt(input.value);
      console.log("Added to order: Onam Sadhya quantity:", value);
      const summarySadhyaCount = document.querySelector('#summarySadhyaCount');
      summarySadhyaCount.textContent = value;
      // Here you can implement logic to add the item to the order summary
      if(value < 1) {
        alert("Please enter a valid quantity (1 or more).");
        return;
      }else {
        alert("Added to order: Onam Sadhya quantity: " + value + " people");
        const btnTitle = element.querySelector('.btn-title');
        if(btnTitle) {
          btnTitle.textContent = "Added to Order";
        }
        element.classList.add('selected'); // Add a class to indicate the button has been clicked
      }
      PriceCalculation(); // Call the price calculation function after adding to order
    }
    function addToOrderPalada(element,event) {
      const input = document.querySelector('#paladaCount');
      // const value = parseInt(input.value) || 1;
      const value = parseInt(input.value);
      console.log("Added to order: Palada Payasam quantity:", value);
      const summaryPaladaCount = document.querySelector('#summaryPaladaCount');
      summaryPaladaCount.textContent = value + 'Ltrs';
      // Here you can implement logic to add the item to the order summary
      if(value < 1) {
        alert("Please enter a valid quantity (1 or more).");
        return;
      }else {
        alert("Added to order: Palada Payasam quantity: " + value + " Ltrs");
        const btnTitle = element.querySelector('.btn-title');
        if(btnTitle) {
          btnTitle.textContent = "Added to Order";
        }
        element.classList.add('selected'); // Add a class to indicate the button has been clicked
      }
      PriceCalculation(); // Call the price calculation function after adding to order
    }
    function addToOrderParipp(element,event) {
      const input = document.querySelector('#parippCount');
      // const value = parseInt(input.value) || 1;
      const value = parseInt(input.value);
      const summaryParippCount = document.querySelector('#summaryParippCount');
      summaryParippCount.textContent = value + 'Ltrs';
      // Here you can implement logic to add the item to the order summary
      if(value < 1) {
        alert("Please enter a valid quantity (1 or more).");
        return;
      }else {
        alert("Added to order: Paripp Payasam quantity: " + value + " Ltrs");
        const btnTitle = element.querySelector('.btn-title');
        if(btnTitle) {
          // btnTitle.textContent = "Added to Order";
          btnTitle.textContent = "Added to Order";
        }
        element.classList.add('selected'); // Add a class to indicate the button has been clicked
      }
      PriceCalculation(); // Call the price calculation function after adding to order
    }

    function PriceCalculation() {
      const sadhyaPrice = 320; // Price for Onam Sadhya
      const paladaPrice = 240;
      const parippPrice = 240;
      const sadhyaInput = document.querySelector('#sadhyaCount');
      const paladaInput = document.querySelector('#paladaCount');
      const parippInput = document.querySelector('#parippCount');

      // Calculate totals
      const sadhyaTotal = sadhyaPrice * (parseInt(sadhyaInput.value) || 0);
      const paladaTotal = paladaPrice * (parseInt(paladaInput.value) || 0);
      const parippTotal = parippPrice * (parseInt(parippInput.value) || 0);

      // Update the total elements
      document.querySelector('#sadhyaTotal').textContent = sadhyaTotal;
      document.querySelector('#paladaTotal').textContent = paladaTotal;
      document.querySelector('#parippTotal').textContent = parippTotal;

      // total amout calculation
      const totalAmount = sadhyaTotal + paladaTotal + parippTotal;
      document.querySelector('#totalAmount').textContent = totalAmount;
    }

    // Whatsapp order

    document.getElementById("whatsappOrder").addEventListener("click", function (e) {
    e.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const place = document.getElementById("customerPlace").value.trim();
    const phoneNumber = document.getElementById("customerPhone").value.trim();
    const deliveryDate = document.getElementById("customerDeliveryDate").value.trim();
    const deliveryTime = document.getElementById("customerDeliveryTime").value.trim();

    // const sadhyaQty = document.getElementById("sadhyaCount").textContent.trim();
    const sadhyaQty = document.getElementById("sadhyaCount").value.trim();
    const sadhyaPrice = document.getElementById("sadhyaTotal").textContent.trim();

    const parippQty = document.getElementById("parippCount").value.trim();
    const parippPrice = document.getElementById("parippTotal").textContent.trim();

    const paladaQty = document.getElementById("paladaCount").value.trim();
    const paladaPrice = document.getElementById("paladaTotal").textContent.trim();

    const total = document.getElementById("totalAmount").textContent.trim();

    const message =
`*ONAM ORDER*

*Customer Details*
Name: ${name}
Place: ${place}
Phone: ${phoneNumber}
Delivery Date: ${deliveryDate}
Delivery Time: ${deliveryTime}

*Order Details*
1. Onam Sadhya
Quantity: ${sadhyaQty} 
Price: ₹${sadhyaPrice}

2. Payasam (Paripp)
Quantity: ${parippQty}
Price: ₹${parippPrice}

3. Payasam (Palada)
Quantity: ${paladaQty}
Price: ₹${paladaPrice}

*Total: ₹${total}*

Please confirm my order.`;

    const phone = "917034763747"; // Replace with your phone number in international format without '+' or '00'

    const url =
        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
});

// quantity input button actions

function changeSadhyaQuantity(amount) {
    const input = document.getElementById("sadhyaCount");

    let value = parseInt(input.value) || 0;
    value += amount;

    const min = parseInt(input.min) || 0;

    if (value < min) {
        value = min;
    }

    input.value = value;
}
function changePaladaQuantity(amount) {
    const input = document.getElementById("paladaCount");

    let value = parseInt(input.value) || 0;
    value += amount;

    const min = parseInt(input.min) || 0;

    if (value < min) {
        value = min;
    }

    input.value = value;
}

function changeParippQuantity(amount) {
    const input = document.getElementById("parippCount");

    let value = parseInt(input.value) || 0;
    value += amount;

    const min = parseInt(input.min) || 0;

    if (value < min) {
        value = min;
    }

    input.value = value;
}