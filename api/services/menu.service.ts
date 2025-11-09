import db from "@/db/client";

export type MenuItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

export async function insertMenuItems(
  menuItems: Omit<MenuItem, "id">[]
): Promise<void> {
  try {
    const database = await db;

    // Clear existing menu items
    await database.execAsync("DELETE FROM menu;");

    // Insert new menu items
    for (const item of menuItems) {
      await database.runAsync(
        "INSERT INTO menu (name, price, description, image, category) VALUES (?, ?, ?, ?, ?);",
        [item.name, item.price, item.description, item.image, item.category]
      );
    }

    console.log(`Successfully inserted ${menuItems.length} menu items`);
  } catch (error) {
    console.error("Error inserting menu items:", error);
    throw error;
  }
}

export async function getMenuItemsCount(): Promise<number> {
  try {
    const database = await db;
    const result = await database.getFirstAsync<{ count: number }>(
      "SELECT COUNT(*) as count FROM menu;"
    );
    return result?.count || 0;
  } catch (error) {
    console.error("Error getting menu count:", error);
    return 0;
  }
}

export async function filterMenuItems(
  searchQuery: string = "",
  categories: string[] = []
): Promise<MenuItem[]> {
  try {
    let sql = "SELECT * FROM menu WHERE 1=1";
    const params: (string | number)[] = [];

    // Add search query filter (case-insensitive)
    if (searchQuery.trim()) {
      sql += " AND name LIKE ?";
      params.push(`%${searchQuery}%`);
    }

    // Add category filter (intersection with search)
    if (categories.length > 0) {
      const placeholders = categories.map(() => "?").join(", ");
      sql += ` AND category IN (${placeholders})`;
      params.push(...categories);
    }

    sql += " ORDER BY name ASC;";

    const database = await db;
    const statement = await database.prepareAsync(sql);
    const result = await statement.executeAsync<MenuItem>(params);
    const allRows = await result.getAllAsync();
    await statement.finalizeAsync();

    return allRows;
  } catch (error) {
    console.error("Error filtering menu:", error);
    throw error;
  }
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number = 500
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
