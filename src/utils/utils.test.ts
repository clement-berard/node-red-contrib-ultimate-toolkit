import { describe, expect, it } from 'vitest';
import { filterByPrefix } from './utils'; // Adapte le chemin

describe('filterByPrefix', () => {
  it('should filter keys by prefix and remove prefix by default', () => {
    const input = [
      {
        user_name: 'John',
        user_email: 'john@example.com',
        admin_role: 'superadmin',
        nodeId: '123',
      },
    ];

    const result = filterByPrefix(input, 'user_');

    expect(result).toEqual({
      name: 'John',
      email: 'john@example.com',
      nodeId: '123',
    });
  });

  it('should keep prefix when removePrefix is false', () => {
    const input = [
      {
        user_name: 'Jane',
        user_age: 30,
        other_field: 'ignored',
      },
    ];

    const result = filterByPrefix(input, 'user_', false);

    expect(result).toEqual({
      user_name: 'Jane',
      user_age: 30,
    });
  });

  it('should always keep nodeId even without matching prefix', () => {
    const input = [
      {
        product_name: 'Laptop',
        nodeId: '456',
        category_type: 'electronics',
      },
    ];

    const result = filterByPrefix(input, 'product_');

    expect(result).toEqual({
      name: 'Laptop',
      nodeId: '456',
    });
  });

  it('should handle empty object', () => {
    const input = [{}];

    const result = filterByPrefix(input, 'test_');

    expect(result).toEqual({});
  });

  it('should handle object with no matching keys', () => {
    const input = [
      {
        name: 'Test',
        email: 'test@example.com',
      },
    ];

    const result = filterByPrefix(input, 'user_');

    expect(result).toEqual({});
  });

  it('should handle different value types', () => {
    const input = [
      {
        data_string: 'text',
        data_number: 42,
        data_boolean: true,
        data_null: null,
        data_array: [1, 2, 3],
        data_object: { nested: 'value' },
      },
    ];

    const result = filterByPrefix(input, 'data_');

    expect(result).toEqual({
      string: 'text',
      number: 42,
      boolean: true,
      null: null,
      array: [1, 2, 3],
      object: { nested: 'value' },
    });
  });

  it('should only return first element of array', () => {
    const input = [
      { user_name: 'First', nodeId: '1' },
      { user_name: 'Second', nodeId: '2' },
    ];

    const result = filterByPrefix(input, 'user_');

    expect(result).toEqual({
      name: 'First',
      nodeId: '1',
    });
  });

  it('should handle empty prefix', () => {
    const input = [
      {
        name: 'Test',
        email: 'test@example.com',
        nodeId: '789',
      },
    ];

    const result = filterByPrefix(input, '');

    expect(result).toEqual({
      name: 'Test',
      email: 'test@example.com',
      nodeId: '789',
    });
  });

  it('should keep only nodeId when no keys match prefix', () => {
    const input = [
      {
        other_field: 'value1',
        another_field: 'value2',
        nodeId: '999',
        random_key: 'value3',
      },
    ];

    const result = filterByPrefix(input, 'user_');

    expect(result).toEqual({
      nodeId: '999',
    });
  });
});
