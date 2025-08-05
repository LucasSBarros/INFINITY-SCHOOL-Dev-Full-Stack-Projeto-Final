export const ROLE_LEVEL = { funcionario: 1, gerente: 3, administrador: 5 };
export function canAccess(role, areaLevel) {
  const lvl = ROLE_LEVEL[role] ?? 0;
  return lvl >= (areaLevel ?? 1);
}
