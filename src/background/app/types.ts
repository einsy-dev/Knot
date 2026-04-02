export interface AppAction {
  reload: boolean;
}

export type AppCallback<K extends keyof AppAction> = {
  (data: AppAction[K]): void;
};
