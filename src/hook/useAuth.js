import { useContext } from "react";
import { AuthContext } from "../hoc/Provider";

export function useAuth() {
    return useContext(AuthContext);
};