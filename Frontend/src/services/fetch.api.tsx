import {ILogin} from "../interfaces/ILogin.ts";
import {FieldValues} from "react-hook-form";

 export const fetchApi = {

    login: (login: FieldValues) => {
        return (
            fetch("http://localhost:8080/api/auth/authenticate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(login),
            })
                .then((response) => response.json())
                .catch((e) => console.log(`Could not fetch data ${e}`))
        );
    },
}