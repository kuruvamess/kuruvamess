// Must match `basePath` in next.config.ts.
// next/image does NOT auto-prepend basePath to local (unoptimized) images,
// so we add it manually here. External URLs (http/https) are returned as-is.
export const BASE_PATH = '/kuruvamess';

export function withBasePath(src: string): string {
  if (/^https?:\/\//i.test(src)) {
    return src;
  }
  return `${BASE_PATH}${src.startsWith('/') ? '' : '/'}${src}`;
}
