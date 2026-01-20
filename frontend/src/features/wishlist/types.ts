import type { Course } from "../courses/types"; // import course nga types i kursit

export type WishlistItem = {
    id: number;
    course: Course;       // objekt i plotë i kursit
    created_at: string;
};
