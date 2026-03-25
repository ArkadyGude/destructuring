import extractSpecialAttacks from '../src/special';

describe('extractSpecialAttacks', () => {
  test('должна извлекать специальные атаки с описанием', () => {
    const character = {
      name: 'Лучник',
      type: 'Bowman',
      health: 50,
      level: 3,
      attack: 40,
      defence: 10,
      special: [
        {
          id: 8,
          name: 'Двойной выстрел',
          icon: 'http://...',
          description: 'Двойной выстрел наносит двойной урон',
        },
        {
          id: 9,
          name: 'Нокаутирующий удар',
          icon: 'http://...',
        },
      ],
    };

    const result = extractSpecialAttacks(character);
    expect(result).toEqual([
      {
        id: 8,
        name: 'Двойной выстрел',
        icon: 'http://...',
        description: 'Двойной выстрел наносит двойной урон',
      },
      {
        id: 9,
        name: 'Нокаутирующий удар',
        icon: 'http://...',
        description: 'Описание недоступно',
      },
    ]);
  });

  test('должна возвращать пустой массив, если поле special отсутствует', () => {
    const character = { name: 'Воин' };
    const result = extractSpecialAttacks(character);
    expect(result).toEqual([]);
  });

  test('должна возвращать пустой массив, если special пустой массив', () => {
    const character = { special: [] };
    const result = extractSpecialAttacks(character);
    expect(result).toEqual([]);
  });

  test('должна обрабатывать отсутствие description в некоторых атаках', () => {
    const character = {
      special: [
        {
          id: 1,
          name: 'Атака 1',
          icon: 'icon1',
          description: 'Описание есть',
        },
        {
          id: 2,
          name: 'Атака 2',
          icon: 'icon2',
        },
      ],
    };
    const result = extractSpecialAttacks(character);
    expect(result).toEqual([
      {
        id: 1,
        name: 'Атака 1',
        icon: 'icon1',
        description: 'Описание есть',
      },
      {
        id: 2,
        name: 'Атака 2',
        icon: 'icon2',
        description: 'Описание недоступно',
      },
    ]);
  });
});
