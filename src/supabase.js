// import { createClient } from '@supabase/supabase-js';

// // // Access environment variables using import.meta.env for Vite
// // const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; 
// // const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// // if (!supabaseUrl || !supabaseKey) {
// //   console.error("Supabase URL:", supabaseUrl);
// //   console.error("Supabase Anon Key:", supabaseKey);
// //   throw new Error("Supabase URL and Anon Key are required. Check your .env file and ensure they are prefixed with VITE_ and the dev server was restarted.");
// // }

// // // export const supabase = createClient(supabaseUrl, supabaseKey);

// // export const supabase = null;



// // Disabled Supabase (for portfolio preview)

// export const supabase = {
//   from: () => ({
//     insert: () => Promise.resolve(),
//     select: () => Promise.resolve(),
//   }),
// };




// Chain-safe + subscription-safe Supabase mock

const chain = {
  select: () => chain,
  insert: () => chain,
  update: () => chain,
  delete: () => chain,
  eq: () => chain,
  order: () => chain,
  limit: () => chain,
  single: () => Promise.resolve({ data: null }),
  then: (resolve) => resolve({ data: [] }),
};

export const supabase = {
  from: () => chain,

  channel: () => ({
    on: () => ({
      subscribe: () => ({
        unsubscribe: () => {},   // ✅ prevents crash
      }),
    }),
  }),
};
