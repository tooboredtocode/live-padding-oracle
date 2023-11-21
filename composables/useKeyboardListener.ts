enum Action {
    Modify = "Modify",
    Replace = "Replace",
    Delete = "Delete",
}

interface ListenerReturn {
    ty: "Modify" | "Replace" | "Delete";
    value: number;
}

export default function(e: KeyboardEvent): ListenerReturn {
    if (e.key === 'ArrowUp') {
        return { ty: Action.Modify, value: 1 };
    } else if (e.key === 'ArrowDown') {
        return { ty: Action.Modify, value: -1 };
    } else if (e.key in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
        return { ty: Action.Replace, value: parseInt(e.key) };
    } else if (e.key.match(/^[a-f]$/)) {
        let value = e.key.charCodeAt(0) - 'a'.charCodeAt(0) + 10;
        return { ty: Action.Replace, value: value };
    } else if (e.key.match(/^[A-F]$/)) {
        let value = e.key.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
        return { ty: Action.Replace, value: value };
    } else if (e.key === 'Backspace') {
        return { ty: Action.Delete, value: 0 };
    }
}