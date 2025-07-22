import { deliveries, type Delivery, type InsertDelivery, type UpdateDelivery } from "@shared/schema";
import { db } from "./db";
import { eq, sql } from "drizzle-orm";

export interface IStorage {
  getDelivery(id: number): Promise<Delivery | undefined>;
  getDeliveryByOrderNumber(orderNumber: string): Promise<Delivery | undefined>;
  getAllDeliveries(): Promise<Delivery[]>;
  createDelivery(delivery: InsertDelivery): Promise<Delivery>;
  updateDelivery(id: number, updates: UpdateDelivery): Promise<Delivery | undefined>;
  deleteDelivery(id: number): Promise<boolean>;
  searchDeliveries(query: string): Promise<Delivery[]>;
  getDeliveriesByStatus(status: string): Promise<Delivery[]>;
  getDeliveryStats(): Promise<{
    total: number;
    delivered: number;
    pending: number;
    pickedUp: number;
    missing: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  async getDelivery(id: number): Promise<Delivery | undefined> {
    const [delivery] = await db.select().from(deliveries).where(eq(deliveries.id, id));
    return delivery || undefined;
  }

  async getDeliveryByOrderNumber(orderNumber: string): Promise<Delivery | undefined> {
    const [delivery] = await db.select().from(deliveries).where(eq(deliveries.orderNumber, orderNumber));
    return delivery || undefined;
  }

  async getAllDeliveries(): Promise<Delivery[]> {
    return await db.select().from(deliveries).orderBy(deliveries.id);
  }

  async createDelivery(insertDelivery: InsertDelivery): Promise<Delivery> {
    const [delivery] = await db
      .insert(deliveries)
      .values(insertDelivery)
      .returning();
    return delivery;
  }

  async updateDelivery(id: number, updates: UpdateDelivery): Promise<Delivery | undefined> {
    const [updated] = await db
      .update(deliveries)
      .set(updates)
      .where(eq(deliveries.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteDelivery(id: number): Promise<boolean> {
    const result = await db.delete(deliveries).where(eq(deliveries.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async searchDeliveries(query: string): Promise<Delivery[]> {
    const lowerQuery = `%${query.toLowerCase()}%`;
    return await db.select().from(deliveries).where(
      sql`LOWER(${deliveries.orderNumber}) LIKE ${lowerQuery} OR 
          LOWER(${deliveries.location}) LIKE ${lowerQuery} OR 
          LOWER(${deliveries.riderName}) LIKE ${lowerQuery} OR 
          LOWER(${deliveries.staffName}) LIKE ${lowerQuery}`
    ).orderBy(deliveries.id);
  }

  async getDeliveriesByStatus(status: string): Promise<Delivery[]> {
    return await db.select().from(deliveries).where(eq(deliveries.status, status)).orderBy(deliveries.id);
  }

  async getDeliveryStats(): Promise<{
    total: number;
    delivered: number;
    pending: number;
    pickedUp: number;
    missing: number;
  }> {
    const all = await db.select().from(deliveries);
    return {
      total: all.length,
      delivered: all.filter(d => d.status === 'Delivered').length,
      pending: all.filter(d => d.status === 'Pending').length,
      pickedUp: all.filter(d => d.status === 'Picked Up').length,
      missing: all.filter(d => d.status === 'Missing').length,
    };
  }
}

export const storage = new DatabaseStorage();
