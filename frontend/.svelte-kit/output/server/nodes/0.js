import * as server from '../entries/pages/_layout.server.js';

export const index = 0;
export const component = async () => (await import('../entries/pages/_layout.svelte.js')).default;
export const file = '_app/immutable/components/pages/_layout.svelte-c5669aa6.js';
export { server };
export const imports = ["_app/immutable/components/pages/_layout.svelte-c5669aa6.js","_app/immutable/chunks/index-4391dc87.js","_app/immutable/chunks/supabase-b719097d.js","_app/immutable/chunks/_commonjsHelpers-725317a4.js","_app/immutable/chunks/singletons-79902e40.js"];
export const stylesheets = ["_app/immutable/assets/_layout-9161171d.css"];
export const fonts = [];
