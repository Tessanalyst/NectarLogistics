import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const deliveries = pgTable("deliveries", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  location: text("location").notNull(),
  riderName: text("rider_name").notNull(),
  staffName: text("staff_name").notNull(),
  pickupDate: text("pickup_date").notNull(),
  deliveryDate: text("delivery_date").notNull(),
  status: text("status").notNull(),
  customerSignature: text("customer_signature"),
});

export const insertDeliverySchema = createInsertSchema(deliveries).omit({
  id: true,
});

export const updateDeliverySchema = createInsertSchema(deliveries).omit({
  id: true,
}).partial();

export const customerConfirmationSchema = z.object({
  orderNumber: z.string().min(1, "Order number is required"),
  signature: z.string().min(1, "Customer signature is required"),
});

export type InsertDelivery = z.infer<typeof insertDeliverySchema>;
export type UpdateDelivery = z.infer<typeof updateDeliverySchema>;
export type CustomerConfirmation = z.infer<typeof customerConfirmationSchema>;
export type Delivery = typeof deliveries.$inferSelect;
