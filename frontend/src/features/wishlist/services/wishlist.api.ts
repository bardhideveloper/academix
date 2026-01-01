
import { http } from "../../../lib/http";
import type { WishlistItem } from "../types";

export async function listWishlist(): Promise<WishlistItem[]> {
    await new Promise(r => setTimeout(r, 200));
    const { data } = await http.get<WishlistItem[]>("/wishlist");
    return data;
}

export async function addToWishlist(courseId: number): Promise<void> {
    await new Promise(r => setTimeout(r, 150));
    await http.post("/wishlist", { course_id: courseId });
}

export async function removeFromWishlist(courseId: number): Promise<void> {
    await new Promise(r => setTimeout(r, 150));
    await http.delete(`/wishlist/${courseId}`);
}

export async function isWishlisted(courseId: number): Promise<boolean> {
    await new Promise(r => setTimeout(r, 100));
    const { data } = await http.get<{ exists: boolean }>(`/wishlist/${courseId}`);
    return !!data?.exists;
}
