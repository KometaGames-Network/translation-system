# Automatic translation system for Minecraft Bedrock: Addon Scripting

The project was created to simplify string storage and facilitate their modification and translation.

## Example

### 1. Create your language files (e.g., `ru.ts`)
```typescript
export default {
  "translation.test": "Translation Test module started."
}
```

### 2. Reading and registering locale's:
```typescript
import ruLocale from "./locales/ru";
import enLocale from "./locales/en";

export class TestModule extends BaseModule {
    public getName(): string { return "TestModule"; }
    public getDescription(): string { return "Translating demo"; }
    public getVersion(): string { return "1.0.0"; }

    public onEnable(): void {
        Translator.registerLocale(this.getName(), LocaleType.RU, ruLocale);
        Translator.registerLocale(this.getName(), LocaleType.EN, enLocale);
        console.info(Translator.get(this, LocaleType.RU, "translation.test", []));
    }
}
```

---

## Dependencies
A modular system is needed.

## Transpilation (and use)

It is a mandatory requirement to include the parameter shown below in ```tsconfig.json```:
```json
"resolveJsonModule": true
```
