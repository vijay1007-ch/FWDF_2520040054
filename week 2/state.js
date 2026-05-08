export let state = {
    employees: [
        { id: 1, name: "Anshu", score: 440, present: true },
        { id: 2, name: "Vennela", score: 288, present: false }
    ]
};

let listeners = [];

export function subscribe(listener) {
    listeners.push(listener);
}

export function setState(newState) {
    state = { ...state, ...newState };   // immutability
    listeners.forEach(l => l());
}