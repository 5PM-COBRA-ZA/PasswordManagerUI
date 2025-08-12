import {create, type StoreApi, type UseBoundStore} from 'zustand';
import {type Profile, type Message} from "../pages//models.tsx";

export interface Store {
    profile?: Profile,
    loading_counter: number,
    is_loading: boolean,
    set_loading: (loading: boolean) => void,
    set_profile: (profile: Profile) => void,
    messages: Message[],
    set_messages: (messages: Message[]) => void,
    logout: () => void,
    theme: string,
    toggle_theme: () => void,
}

export const use_store: UseBoundStore<StoreApi<Store>> = create((set): Store => ({
    profile: undefined,
    loading_counter: 0,
    is_loading: false,
    set_loading: (loading: boolean) => {
        set((prev: Store) => {
            const to_add = loading ? 1 : -1;
            let counter = prev.loading_counter + to_add;
            if(counter < 0)
                counter = 0;
            return({
                is_loading: counter > 0,
                loading_counter: counter
            });
        })
    },
    set_profile: (profile: Profile) => set({ profile: profile }),
    messages: [],
    set_messages: (messages: Message[]) => set({ messages: messages }),
    logout: () => set({ profile: undefined }),
    theme: 'dark',
    toggle_theme: () => {
        set((prev: Store) => {
            return({
                theme: prev.theme == 'dark' ? 'light' : 'dark'
            });
        })
    }
}))
