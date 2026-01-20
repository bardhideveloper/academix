// src/features/wishlist/wishlist.api.ts
import { http } from "../../../lib/http";
import type { WishlistItem } from "../types";

export async function listWishlist(): Promise<WishlistItem[]> {
    const { data } = await http.get<WishlistItem[]>("/wishlist/mine/");
    return data;
}

export async function addToWishlist(courseId: number): Promise<void> {
    await http.post("/wishlist/", { course_id: courseId });
}

export async function removeFromWishlist(courseId: number): Promise<void> {
    await http.delete(`/wishlist/${courseId}/`);  
}

export async function isWishlisted(courseId: number): Promise<boolean> {
    const wishlist = await listWishlist();
    return wishlist.some(w => w.course.id === courseId);
}
