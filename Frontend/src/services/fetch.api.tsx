import {IUser} from "../interfaces/IUser";
import {IToken} from "../interfaces/IToken";

const fetchApi = {

    register: (user:IUser) => {
        return (
            fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            })
                .then((response) => response.json())
                .catch((e) => console.log(`Något blev fel ${e}`))
        );
    },
}