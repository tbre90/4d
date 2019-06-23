/*
 * what it does
 *      for now form_validator is very simple
 *      and only checks if there is any user input
 *      in the provided fields
 *
 * input
 *      @1 the name of the form's submit button
 *      @2 an array of array, where each inner array contains the form field name, and a placeholder text
 *      @3 a function to call if form is validated
 * output
 *      nothing
 *      adds an event listener to a form's submit button
 *      upon successfully validating the form, onSuccess is called
 */
let form_validator = function(btnName, inputArray, onSuccess) {
    let btn = document.getElementById(btnName);
    
    // [ ["id", "old border"], ...]
    let fields = [];

    btn.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();

        let errors = 0;
        let fields_idx = 0;
        for (let i = 0; i < inputArray.length; i++) {
            let elem = document.getElementById(inputArray[i][0]);
            if (elem.value === "") {
                fields.push([elem.id, elem.style.border]);

                elem.placeholder = inputArray[i][1];
                elem.style.border = "1px solid #FF0000";
                elem.addEventListener("input", resetField.bind(null, elem));

                errors += 1;
            }
        }

        if (errors > 0) {
            return;
        } else {
            onSuccess();
        }
    });

    let resetField = function(elem) {
        for (let i = 0; i < fields.length; i++) {
            if (fields[i][0] == elem.id) {
                elem.style.border = fields[i][1];
                break;
            }
        }

        elem.removeEventListener("input", resetField);
   }
}
