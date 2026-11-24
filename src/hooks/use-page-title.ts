import { useEffect } from 'react';

const BRAND = 'Maison Dorée';

/** Names the browser tab after the page: "Cart · Maison Dorée". The home page passes nothing. */
export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${BRAND}` : `${BRAND} · Pâtisserie, Paris`;
  }, [title]);
}
