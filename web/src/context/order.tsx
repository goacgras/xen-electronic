import { createContext, useContext, useReducer } from "react";
import { OrderResponse } from "../types";

interface State {
    authenticated: boolean;
    orderResponse: OrderResponse | undefined;
}

interface Action {
    type: string;
    payload: any;
}

const StateContext = createContext<State>({
    authenticated: false,
    orderResponse: null as any,
});

const DispatchContext = createContext<any>(null);

const reducer = (state: State, { type, payload }: Action) => {
    switch (type) {
        case "SET_RES_ORDER":
            return {
                ...state,
                authenticated: true,
                orderResponse: payload,
            };
        case "CHECKOUT":
            return {
                ...state,
                authenticated: false,
                user: null,
            };
        default:
            throw new Error(`Unknown action type: ${type}`);
    }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, defaultDispatch] = useReducer(reducer, {
        orderResponse: null,
        authenticated: false,
    });

    const dispatch = (type: string, payload?: any) => {
        defaultDispatch({ type, payload });
    };

    return (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                {children}
            </StateContext.Provider>
        </DispatchContext.Provider>
    );
};

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);
