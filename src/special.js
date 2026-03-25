export default function extractSpecialAttacks(character) {
  const { special } = character;
  if (!special) return [];

  return special.map(({ id, name, icon, description }) => ({
    id,
    name,
    icon,
    description: description || 'Описание недоступно',
  }));
}
