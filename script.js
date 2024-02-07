function calculateFee() {
    const timeIn = new Date(document.getElementById("time-in").value);
    const timeOut = new Date(document.getElementById("time-out").value);

    const diffMilliseconds = timeOut - timeIn;
    const diffHours = diffMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours

    let totalAmount = 0;
    let timeConsumed;

    // Calculate the time consumed
    const hoursConsumed = Math.floor(diffHours);
    let minutesConsumed = Math.ceil((diffMilliseconds % (1000 * 60 * 60)) / (1000 * 60)); // Convert remaining milliseconds to minutes and round up

    if (hoursConsumed === 0 && minutesConsumed === 0) {
        // If time consumed is 0, set totalAmount to 0 and return
        timeConsumed = "0 hours";
    } else {
        if (minutesConsumed >= 2) {
            // Consider every couple of minutes as an additional hour
            minutesConsumed = 0;
            totalAmount = 50 + ((hoursConsumed - 2) * 10); // First 3 hours: 50 pesos, succeeding hours: 10 pesos each
        } else {
            if (hoursConsumed <= 3) {
                totalAmount = 50;
            } else {
                totalAmount = 50 + ((hoursConsumed - 3) * 10); // First 3 hours: 50 pesos, succeeding hours: 10 pesos each
            }
        }
        timeConsumed = `${hoursConsumed} hours and ${minutesConsumed} minutes`;
    }

    let vat = totalAmount * 0.12;
    let vatSales = totalAmount - vat;

    const resultElement = document.getElementById("result");
    resultElement.innerHTML = `
      <p>Time Consumed: ${timeConsumed}</p>
      <p>Total Parking Fee: ${totalAmount.toFixed(2)} pesos</p>
      <p>VAT: ${vat.toFixed(2)} pesos</p>
      <p>VAT Sales: ${vatSales.toFixed(2)} pesos</p>
    `;
}
