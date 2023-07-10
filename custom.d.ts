declare interface ImportMeta {
    glob: (specifier: string) => Record<string, () => Promise<{ default: string }>>;
  }
  