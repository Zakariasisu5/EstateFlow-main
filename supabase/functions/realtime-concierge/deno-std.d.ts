declare module "https://deno.land/std@0.208.0/http/mod.ts" {
  // Minimal typings to satisfy TypeScript in editors that don't resolve Deno's remote modules.
  // We intentionally keep types broad (`any`) to avoid mismatches with the real Deno runtime.
  export type Handler = (req: Request) => Response | Promise<Response>;
  export function serve(handler: Handler, options?: any): void;
  const _default: any;
  export default _default;
}
