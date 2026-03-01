import type { Ref } from "vue";

class Theme {
    private readonly inner: Ref<string>;

    public constructor() {
        this.inner = useState('theme', () => "default");
    }

    public get(): string {
        return this.inner.value;
    }

    public reactive(): Ref<string> {
        return this.inner;
    }

    public set(dark: boolean): void {
        if (dark) {
            this.setDark();
        } else {
            this.setLight();
        }
    }

    public setDark(): void {
        this.inner.value = "dark";
    }

    public setLight(): void {
        this.inner.value = "light";
    }

    public toggle(): void {
        if (this.get() === "dark") {
            this.setLight();
        } else {
            this.setDark();
        }
    }
}

export default function useTheme(): Theme {
    return new Theme();
}