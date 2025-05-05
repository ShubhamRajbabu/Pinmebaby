import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    markers: defineTable({
        itemName: v.string(),
        imageUrl: v.string(),
        latitude: v.number(),
        longitude: v.number(),
        createdAt: v.number()
    })
})