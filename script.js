document.getElementById("calculateBtn").addEventListener("click", () => {
    let name = document.getElementById("name").value;
    let price = parseFloat(document.getElementById("startingBid").value);

    if (!name || !price) {
        alert("Please enter both the name and starting bid.");
        return;
    }

    // Calculate education coefficient
    const education = parseFloat(document.getElementById("education").value);
    price *= education;

    // Calculate family net worth coefficient
    const netWorth = parseFloat(document.getElementById("netWorth").value);
    price *= netWorth;

    // Add caste value
    const caste = parseFloat(document.getElementById("caste").value);
    price += caste;

    // Calculate skills
    const skills = Array.from(document.getElementsByClassName("skills"));
    const skillBonus = skills.filter(skill => skill.checked).reduce((sum, skill) => sum + parseFloat(skill.value), 0);
    price += skillBonus;

    // Calculate age coefficient
    const ages = Array.from(document.getElementsByClassName("age"));
    ages.forEach(age => {
        if (age.checked) {
            price *= parseFloat(age.value);
        }
    });

    // Calculate reputation coefficient
    const reputation = Array.from(document.getElementsByClassName("reputation"));
    for (let i = 0; i < reputation.length; i++) {
        if (reputation[i].checked) {
            const value = parseFloat(reputation[i].value);
            price = (value > 0) ? price * value : price + value;
        }
    }

    // Collect love letter
    const loveLetter = document.getElementById("loveLetter").value;

    // Create the final object
    let person = {
        name: name,
        price: price.toFixed(2),
        loveLetter: loveLetter
    };

    // Display result
    document.getElementById("result").innerHTML = `The dowry for ${person.name} is $${person.price}.<br>Love Letter: ${person.loveLetter}`;
});
