import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDeliverySchema, updateDeliverySchema, customerConfirmationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all deliveries
  app.get("/api/deliveries", async (_req, res) => {
    try {
      const deliveries = await storage.getAllDeliveries();
      res.json(deliveries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch deliveries" });
    }
  });

  // Get delivery statistics
  app.get("/api/deliveries/stats", async (_req, res) => {
    try {
      const stats = await storage.getDeliveryStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  // Get delivery by ID
  app.get("/api/deliveries/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const delivery = await storage.getDelivery(id);
      if (!delivery) {
        return res.status(404).json({ message: "Delivery not found" });
      }
      res.json(delivery);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch delivery" });
    }
  });

  // Create new delivery
  app.post("/api/deliveries", async (req, res) => {
    try {
      const data = insertDeliverySchema.parse(req.body);
      
      // Check if order number already exists
      const existing = await storage.getDeliveryByOrderNumber(data.orderNumber);
      if (existing) {
        return res.status(400).json({ message: "Order number already exists" });
      }

      const delivery = await storage.createDelivery(data);
      res.status(201).json(delivery);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create delivery" });
    }
  });

  // Update delivery
  app.patch("/api/deliveries/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = updateDeliverySchema.parse(req.body);
      
      const delivery = await storage.updateDelivery(id, data);
      if (!delivery) {
        return res.status(404).json({ message: "Delivery not found" });
      }
      res.json(delivery);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update delivery" });
    }
  });

  // Delete delivery
  app.delete("/api/deliveries/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteDelivery(id);
      if (!success) {
        return res.status(404).json({ message: "Delivery not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete delivery" });
    }
  });

  // Search deliveries
  app.get("/api/deliveries/search/:query", async (req, res) => {
    try {
      const query = req.params.query;
      const deliveries = await storage.searchDeliveries(query);
      res.json(deliveries);
    } catch (error) {
      res.status(500).json({ message: "Failed to search deliveries" });
    }
  });

  // Get deliveries by status
  app.get("/api/deliveries/status/:status", async (req, res) => {
    try {
      const status = req.params.status;
      const deliveries = await storage.getDeliveriesByStatus(status);
      res.json(deliveries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch deliveries by status" });
    }
  });

  // Customer confirmation
  app.post("/api/deliveries/confirm", async (req, res) => {
    try {
      const data = customerConfirmationSchema.parse(req.body);
      
      const delivery = await storage.getDeliveryByOrderNumber(data.orderNumber);
      if (!delivery) {
        return res.status(404).json({ message: "Order not found" });
      }

      if (delivery.status === 'Delivered') {
        return res.status(400).json({ message: "Order already delivered" });
      }

      const updated = await storage.updateDelivery(delivery.id, {
        status: 'Delivered',
        customerSignature: data.signature
      });

      res.json(updated);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to confirm delivery" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
