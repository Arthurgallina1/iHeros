const verifyIfAllFieldsAreValid = (formData) => {
    let allFieldsAreValid = true;
    let errorMsg = "";
    for (let prop in formData) {
        if (formData[prop] === "") {
            allFieldsAreValid = false;
        } else {
            let value = formData[prop];
            if (prop === "name") {
                if (value.length > 25) {
                    allFieldsAreValid = false;
                    errorMsg = "O nome não pode possui mais de 25 caracteres.";
                }
            } else if (prop === "lat" || prop === "lng") {
                if (Number(value) > 180 || Number(value) < -180) {
                    allFieldsAreValid = false;
                    errorMsg =
                        "LAT e LNG não podem ser maior que 180 ou menor que -180.";
                }
            }
        }
    }
    return { allFieldsAreValid, errorMsg };
};

export { verifyIfAllFieldsAreValid };
