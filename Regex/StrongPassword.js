/*
Characteristics of a strong password:

At least 8 Characters: [characters]{8,}$
Mix of upper and lowercase letters: (?=.*[a-z])(?=.*[A-Z])
Mix of letters and numbers: (?=.*\d)
Inclusion of special characters (DO not use < or > as this can cause issues in 
    web browsers): (?=.*[!@#$%^&*])
*/

function StrongPassword(password) {

    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-z\d!@#$%^&*]{8,}$/;

}