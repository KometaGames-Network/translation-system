import { BaseModule } from "../modular-system/base-module";
import { LocaleType } from "./locale-type.enum";

export class Translator {
    private static locales: Map<string, Record<string, string>> = new Map();

    public static registerLocale(moduleName: string, locale: LocaleType, data: Record<string, string>): void {
        let key = `${moduleName.toLowerCase()}_${locale}`;
        this.locales.set(key, data);
    }

    /**
     * @param module Module object (this)
     * @param locale Language (RU, EN...)
     * @param key String key (for example, "player.notAllow")
     * @param args Parameters (for example {0}, {1}...)
     */
    public static get(module: BaseModule, locale: LocaleType, key: string, args: any[] = []): string {
        let moduleName = module.getName().toLowerCase();
        let storageKey = `${moduleName}_${locale}`;

        let localeData = this.locales.get(storageKey);

        if (!localeData) {
            return `§c[Missing Translation File: ${moduleName}_${locale}.json]§r`;
        }

        let message = localeData[key];

        if (!message) {
            return `§c[Missing Key: ${key} in ${moduleName}_${locale}]§r`;
        }

        if (args.length > 0) {
            args.forEach((value, index) => {
                let placeholder = new RegExp(`\\{${index}\\}`, 'g');
                message = message.replace(placeholder, String(value));
            });
        }

        return message;
    }
}
