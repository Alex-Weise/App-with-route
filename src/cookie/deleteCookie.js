import { setCookie } from "./setCoockie";

export function deleteCookie(name) {
    setCookie(name, "", {
      'max-age': -1,
    })
};