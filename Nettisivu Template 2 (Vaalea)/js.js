window.onload = function()
{
    document.getElementById("defaultOpen").click();
}


function selectNavbarElement(pageName)
{
    document.getElementById(pageName).click();
}


function openPage(evt, pageName)
{

    var i, tabcontent, tablinks;
  
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++)
    {
      tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++)
    {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    document.getElementById(pageName).style.display = "block";
    evt.currentTarget.className += " active";
}


var fields = {};

document.addEventListener("DOMContentLoaded", function()
{
    fields.firstName = document.getElementById('firstName');
    fields.lastname = document.getElementById('lastName');
    fields.phone = document.getElementById('phone');
    fields.email = document.getElementById('email');
    fields.address = document.getElementById('address');
    fields.additionalInfo = document.getElementById('additionalInfo')
})


function isEmailValid()
{
    if(fields.email.value.indexOf('@') === -1)
    {
        toggleAlert("1");
        return false;
    }
    else
    {
        return true;
    }
}


function isPhoneValid()
{
    var validPhoneNumberForeign = /^\+?([0-9]{3})\)?[-. ]?([0-9]{2})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var validPhoneNumberInline = /^\+?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    if(fields.phone.value.match(validPhoneNumberForeign) || fields.phone.value.match(validPhoneNumberInline))
    {
        return true;
    }
    else
    {
        toggleAlert("2");
        return false;
    }
}


function gatherServices()
{
    var form = document.getElementById("checkBoxes"),
    inputs = form.getElementsByTagName("input"),
    arr = [];

    for (var i = 0, max = inputs.length; i < max; i += 1) {
       // Take only those inputs which are checkbox
       if (inputs[i].type === "checkbox" && inputs[i].checked) {
          arr.push(" " + inputs[i].value);
       }
    }
    return arr;
}


function gatherUserInput()
{
    var userInput = "";

    userInput += '<strong>[        Nimi         ]: </strong>' + fields.firstName.value + ' ' + fields.lastname.value + '<br></br>';
    userInput += '<strong>[        Puh          ]: </strong>' + fields.phone.value + '<br></br>';
    userInput += '<strong>[     Sähköposti      ]: </strong>' + fields.email.value + '<br></br>';
    userInput += '<strong>[       Osoite        ]: </strong>' + fields.address.value + '<br></br>';
    userInput += '<strong>[    Lisätietoja      ]: </strong>' + fields.additionalInfo.value + '<br></br>';
    
    userInput += '<strong>[      Palvelu/t      ]:</strong>' + gatherServices() + '<br></br>';

    return userInput;
}


function toggleAlert(x)
{
    switch(x)
    {
        case ("1"):
            document.getElementById("emailAlert").style.display = "block"
            //setTimeout(toggleAlert(4), 3000);
			break;
        case ("2"):
            document.getElementById("phoneAlert").style.display = "block"
            //setTimeout(toggleAlert(4), 3000);
			break;
        case ("3"):
            document.getElementById("successAlert").style.display = "block"
            //setTimeout(toggleAlert(4), 3000);
			break;
		default:
            console.log("Type was: " + x);
			document.getElementById("successAlert").style.display = "none"
            document.getElementById("phoneAlert").style.display = "none"
            document.getElementById("emailAlert").style.display = "none"
			break;
    }
}

// Yes, the email username and password are visible from code. If this would be a production version, we would use the smptjs
// encrypted method at line 192! \\

// EMAIL SENDING WITHOUT SECURETOKEN \\

function sendEmail()
{
    if(isEmailValid() && isPhoneValid())
    {
        Email.send(
        {
	        Host: "smtp.gmail.com",
	        Username : "palaute.vamia@gmail.com",
	        Password : "0Pp11k0h4n",
	        To : 'japsu.honkasalo@gmail.com',
	        From : fields.email.value,
	        Subject : "Uusi yhteydenottopyyntö",
            Body : gatherUserInput()
	    }).then
        (
	    	message => toggleAlert("3")
        );
    }
}


//STORE
/*
function isNotEmpty(value)
{
    if (value == null || typeof value == 'undefined' )
    {
        return false;
    }
    else
    {
        return (value.length > 0);
    }
}


function isNumber(num)
{
    return (num.length > 0) && !isNaN(num);
}


function isAlphanumeric(value)
{
    var letterNumber = /^[0-9a-zA-Z]+$/;
    if((value.value.match(letterNumber)))
    {
        return true;
    }
    else
    { 
        return false; 
    }
}


   // EMAIL SENDING WITH SECURETOKEN \\    READ: https://smtpjs.com/
function sendEmail()
{
    if(isEmailValid() && isPhoneValid())
    {
        Email.send(
        {
	        SecureToken : "af15681d-cd66-4d7e-be65-436975217671",
	        To : 'japsu.honkasalo@gmail.com',
	        From : fields.email.value,
	        Subject : "Uusi yhteydenottopyyntö",
            Body : gatherUserInput()
	    }).then
        (
	    	message => alert("Viestisi on lähetetty onnistuneesti!")
        );
    }
}
*/