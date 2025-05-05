import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getAllMarkers = query({
    args: {},
    handler: async (ctx) => {
        const allMarkers = await ctx.db.query("markers").order('desc').collect();
        if (!allMarkers) return null;
        return allMarkers;
    }
});

export const getMarkerById = query({
    args: { id: v.id("markers") },
    handler: async (ctx, args) => {
        const markerId = await ctx.db.get(args.id);
        if (!markerId) return null;
        return markerId;
    }
});

export const createMarker = mutation({
    args: {
        itemName: v.string(),
        imageUrl: v.string(),
        latitude: v.number(),
        longitude: v.number(),
    },
    handler: async (ctx, agrs) => {
        const { itemName, imageUrl, latitude, longitude } = agrs;
        try {
            await ctx.db.insert('markers', {
                itemName,
                imageUrl,
                latitude,
                longitude,
                createdAt: Date.now(),
            });
        } catch (error) {
            console.error("Error creating marker:", error);
            throw new Error("Failed to create marker. Please try again later.");
        }

    }
})