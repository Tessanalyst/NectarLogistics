import { db } from "./db";
import { deliveries } from "@shared/schema";

export async function seedDatabase() {
  try {
    // Check if data already exists
    const existing = await db.select().from(deliveries).limit(1);
    if (existing.length > 0) {
      console.log("Database already has data, skipping seed...");
      return;
    }

    // Sample data for demonstration
    const sampleDeliveries = [
      {
        orderNumber: "ORD-001",
        location: "Downtown Mall",
        riderName: "John Smith",
        staffName: "Admin User",
        pickupDate: "2025-01-15",
        deliveryDate: "2025-01-15",
        status: "Delivered",
        customerSignature: "Customer A"
      },
      {
        orderNumber: "ORD-002", 
        location: "Business District",
        riderName: "Jane Doe",
        staffName: "Admin User",
        pickupDate: "2025-01-16",
        deliveryDate: "2025-01-16",
        status: "Delivered",
        customerSignature: "Customer B"
      },
      {
        orderNumber: "ORD-003",
        location: "Residential Area",
        riderName: "Mike Johnson",
        staffName: "Admin User", 
        pickupDate: "2025-01-16",
        deliveryDate: "2025-01-17",
        status: "Pending",
        customerSignature: null
      },
      {
        orderNumber: "ORD-004",
        location: "Shopping Center",
        riderName: "John Smith",
        staffName: "Admin User",
        pickupDate: "2025-01-17",
        deliveryDate: "2025-01-17",
        status: "Picked Up",
        customerSignature: null
      },
      {
        orderNumber: "ORD-005",
        location: "Office Complex",
        riderName: "Jane Doe",
        staffName: "Admin User",
        pickupDate: "2025-01-17",
        deliveryDate: "2025-01-18",
        status: "Missing",
        customerSignature: null
      },
      {
        orderNumber: "ORD-006",
        location: "Downtown Mall",
        riderName: "Mike Johnson", 
        staffName: "Admin User",
        pickupDate: "2025-01-17",
        deliveryDate: "2025-01-17",
        status: "Delivered",
        customerSignature: "Customer C"
      }
    ];

    await db.insert(deliveries).values(sampleDeliveries);
    console.log("Database seeded with sample data");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}