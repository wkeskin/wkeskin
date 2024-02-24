"use strict";

//---------------- Set same billing and delivery address -----------------------------------
function autoFill (){
    var checkbox = document.getElementById("dSameAsB");
    var delAddressForm = document.getElementById("delAddress");
    
    if (checkbox.checked) {
        // autoFill the delivery address fields
        delAddressForm.dFname.value = document.getElementById("bFname").value;
        delAddressForm.dLname.value = document.getElementById("bLname").value;
        delAddressForm.dAddress.value = document.getElementById("bAddress").value;
        delAddressForm.dCity.value = document.getElementById("bCity").value;
        delAddressForm.dState.value = document.getElementById("bState").value;
        delAddressForm.dZip.value = document.getElementById("bZip").value;
        delAddressForm.dPhone.value = document.getElementById("bPhone").value;
        
    } else {
        // Clear the delivery address fields
        delAddressForm.dFname.value = "";
        delAddressForm.dLname.value = "";
        delAddressForm.dAddress.value = "";
        delAddressForm.dCity.value = "";
        delAddressForm.dState.value = "";
        delAddressForm.dZip.value = "";
        delAddressForm.dPhone.value = "";
    }
}

//------------------ Check and Set Validity-------------------------------------------------
//----------------- BILLING INFORMATION VALIDITY--------------------------------------------
function validateBilling(){
    // First Name Validity
    let bFname = document.getElementById("bFname");
    if (bFname.validity.valueMissing){
        bFname.setCustomValidity("Enter your First Name!");
    } else {
        bFname.setCustomValidity("");
    }
    // Last Name Validity
    let bLname = document.getElementById("bLname");
    if (bLname.validity.valueMissing){
        bLname.setCustomValidity("Enter your Last Name!");
    } else {
        bLname.setCustomValidity("");
    }
    // Street Address Validity
    let bAddress = document.getElementById("bAddress");
    if (bAddress.validity.valueMissing){
        bAddress.setCustomValidity("Enter your number and street name!");
    } else {
        bAddress.setCustomValidity("");
    }
    // City Validity
    let bCity = document.getElementById("bCity");
    if (bCity.validity.valueMissing){
        bCity.setCustomValidity("Enter your city name!");
    } else {
        bCity.setCustomValidity("");
    }
    // State/Province Validity
    let bState = document.getElementById("bState");
    if (bState.selectedIndex === 0) {
        bState.setCustomValidity("Select the state or province!");
    } else {
        bState.setCustomValidity("");
    }
    // Zip Code validity (following canadian format 'X1X 1X1' or 'x1x1x1')
    let bZip = document.getElementById("bZip");
    if (bZip.validity.valueMissing) {
        bZip.setCustomValidity("Enter your Zip Code!");
    } else if (!/[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d/i.test(bZip.value)) {
        bZip.setCustomValidity("Enter a valid Zip Code in the format 'A1A 1X1' or 'a1a 1x1'");
    } else {
        bZip.setCustomValidity("");
    }
    // Phone Validity (following Canadian phone format (123) 456-7890 or 123-456-7890)
    let bphone = document.getElementById("bphone");
    if (bphone.validity.valueMissing) {
        bphone.setCustomValidity("Enter your Phone Number!");
    } else if (!/^\(?\d{3}\)?[-.●]?\d{3}[-.●]?\d{4}$/.test(bphone.value)) {
        bphone.setCustomValidity("Enter a valid Canadian Phone Number in the format '(123) 456-7890' or '123-456-7890' and must be 10 digits long.");
    } else {
        bphone.setCustomValidity("");
    }

 }
 
/* ------- Luhn Algorithm used for Validating Credit Card Numbers   ----- */

function luhn(idNum) {
   let string1 = "";
   let string2 = "";
   
   // Retrieve the odd-numbered digits starting from the back
   for (let i = idNum.length - 1; i >= 0; i-= 2) {
      string1 += idNum.charAt(i);
   }
   // Retrieve the even-numbered digits starting from the back and double them
   for (let i = idNum.length - 2; i >= 0; i-= 2) {
      string2 += 2*idNum.charAt(i);
   }
   
   // Return whether the sum of the digits is divisible by 10
   return sumDigits(string1 + string2) % 10 === 0;
   
   function sumDigits(numStr) {
      let digitTotal = 0;
      for (let i = 0; i < numStr.length; i++) {
         digitTotal += parseInt(numStr.charAt(i));
      }
      return digitTotal;
   }
}

// CREDIT CARD INFORMATION VALIDATION
// Check if a credit card has been selected
function validateCard(){
    let card = document.forms.payment.elements.credit[0];
    if (card.validity.valueMissing) {
       card.setCustomValidity("Select your credit card");
    } else {
       card.setCustomValidity("");
    }
 }
 
 // check if the card number is valid
 function validateNumber(){
    let cNum = document.getElementById("cardNumber");
    if (cNum.valueMissing) {
       cNum.setCustomValidity("Enter your card number");
    } else if (cNum.validity.patternMismatch) {
       cNum.setCustomValidity("Enter a valid card number");
 } else if (luhn(cNum.value) === false) {
    cNum.setCustomValidity("Enter a legitimate card number");
 } else {
    cNum.setCustomValidity("");
 }
 }
 
 // check that a month is selected for the expiration date
 function validateMonth (){
    let month = document.getElementById("expMonth");
    if (month.selectedIndex === 0) {
       month.setCustomValidity("Select the expiration month");
    } else {
       month.setCustomValidity("");
    }
 }
 
 // check that a year is selected for the expiration date
 function validateYear (){
    let year = Document.getElementById("expYear");
    if (year.selectedIndex === 0) {
       year.setCustomValidity("Select the expiration year");
    } else {
       year.setCustomValidity("");
    }
 }
 
 function validateCVC() {
    //Determine which card was selected
    let card = document.querySelector('input[name="credit"]:checked').value;
    let cvc = document.getElementById("cvc");
 
    // validate the CVC value
    if (cvc.validity.valueMissing) {
       cvc.setCustomValidity("Enter your CVC number");
    } else if ((card === "amex") && !(/^\d{4}$/.test(cvc.value))) {
       cvc.setCustomValidity("Enter a 4-digit number");
    } else if ((card !== "amex") && !(/^\d{3}$/.test(cvc.value))) {
       cvc.setCustomValidity("Enter a 3-digit number");
    } else {
       cvc.setCustomValidity("");
    }
 }

//----------------- DELIVERY INFORMATION VALIDITY--------------------------------------------
/*function validateDelivery(){
    // First Name Validity
    let dFname = document.getElementById("dFname");
    if (dFname.validity.valueMissing){
        dFname.setCustomValidity("Enter your First Name!");
    } else {
        dFname.setCustomValidity("");
    }
    // Last Name Validity
    let dLname = document.getElementById("dLname");
    if (dLname.validity.valueMissing){
        dLname.setCustomValidity("Enter your Last Name!");
    } else {
        dLname.setCustomValidity("");
    }
    // Street Address Validity
    let dAddress = document.getElementById("dAddress");
    if (dAddress.validity.valueMissing){
        dAddress.setCustomValidity("Enter your number and street name!");
    } else {
        dAddress.setCustomValidity("");
    }
    // City Validity
    let dCity = document.getElementById("dCity");
    if (dCity.validity.valueMissing){
        dCity.setCustomValidity("Enter your city name!");
    } else {
        dCity.setCustomValidity("");
    }
    // State/Province Validity
    let dState = document.getElementById("dState");
    if (dState.selectedIndex === 0) {
        dState.setCustomValidity("Select the state or province!");
    } else {
        dState.setCustomValidity("");
    }
    // Zip Code validity (following canadian format 'X1X 1X1' or 'x1x1x1')
    let dZip = document.getElementById("dZip");
    if (dZip.validity.valueMissing) {
        dZip.setCustomValidity("Enter your Zip Code!");
    } else if (!/[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d/i.test(dZip.value)) {
        dZip.setCustomValidity("Enter a valid Zip Code in the format 'A1A 1X1' or 'a1a 1x1'");
    } else {
        dZip.setCustomValidity("");
    }
    // Phone Validity (following Canadian phone format (123) 456-7890 or 123-456-7890)
    let dphone = document.getElementById("dphone");
    if (dphone.validity.valueMissing) {
        dphone.setCustomValidity("Enter your Phone Number!");
    } else if (!/^\(?\d{3}\)?[-.●]?\d{3}[-.●]?\d{4}$/.test(dphone.value)) {
        dphone.setCustomValidity("Enter a valid Canadian Phone Number in the format '(123) 456-7890' or '123-456-7890' and must be 10 digits long.");
    } else {
        dphone.setCustomValidity("");
    }
 }*/
 
 let subButton1 = document.getElementById("subButton1");

 // Validate the billing and delivery information when the save button is clicked
 subButton1.addEventListener("click", validateBilling);