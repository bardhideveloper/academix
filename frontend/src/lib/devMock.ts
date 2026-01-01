import type { AxiosResponse } from "axios";
import { http } from "./http";

/**
 * Simple dev-only mock layer. It intercepts /auth/* endpoints and returns
 * fake data so your UI works before the backend is live.
 * Remove or disable once the real API is available.
 */
export function enableDevMocks() {
  if (!import.meta.env.DEV) return;

  http.interceptors.request.use((config) => {
    config.headers = config.headers ?? {};
    (config.headers as Record<string, string>)["X-Dev-Mock"] = "true";
    return config;
  });


  http.interceptors.request.use(async (config) => {
    const url = (config.url ?? "").toLowerCase();
    const method = (config.method ?? "get").toLowerCase();

    const ok = (data: any, status = 200): AxiosResponse => ({
      data,
      status,
      statusText: "OK",
      headers: {},
      config,
    });

    if (url.endsWith("/auth/me") && method === "get") {
      const token = localStorage.getItem("ax_token");
      if (!token) {
        throw {
          response: { status: 401, data: { detail: "Not authenticated (dev mock)" } },
          message: "Unauthorized",
        };
      }
      return Promise.reject({ __mock_bypass__: ok({ id: 1, email: "dev@academix.test", name: "Dev User", role: "student" }) });
    }

    if (url.endsWith("/auth/login") && method === "post") {
      const body = config.data ?? {};
      const identifier = body.email ?? body.identifier ?? "user@academix.test";
      const user = { id: 1, email: identifier, name: "Dev User", role: "student" };
      const token = "dev-token-" + Math.random().toString(36).slice(2);
      return Promise.reject({ __mock_bypass__: ok({ token, user }) });
    }

    if (url.endsWith("/auth/register") && method === "post") {
      const body = config.data ?? {};
      const email = body.email ?? "new@academix.test";
      const name = body.name ?? "New User";
      const user = { id: 2, email, name, role: "student" };
      const token = "dev-token-" + Math.random().toString(36).slice(2);
      return Promise.reject({ __mock_bypass__: ok({ token, user }) });
    }

    if (url.endsWith("/courses") && method === "get") {
      const courses = [
        { id: 101, title: "React Fundamentals", description: "Components, state, props.", category: "Beginner", duration: "4h" },
        { id: 102, title: "Django REST API", description: "Views, serializers, auth.", category: "Intermediate", duration: "6h" },
        { id: 103, title: "Celery & Redis", description: "Tasks, queues, notifications.", category: "Intermediate", duration: "3h" },
      ];
      return Promise.reject({ __mock_bypass__: ok(courses) });
    }


    if (url.match(/\/courses\/\d+$/) && method === "get") {
      const id = Number(url.split("/").pop());
      const courses = [
        { id: 101, title: "React Fundamentals", description: "Components, state, props.", category: "Beginner", duration: "4h" },
        { id: 102, title: "Django REST API", description: "Views, serializers, auth.", category: "Intermediate", duration: "6h" },
        { id: 103, title: "Celery & Redis", description: "Tasks, queues, notifications.", category: "Intermediate", duration: "3h" },
      ];
      const course = courses.find(c => c.id === id);
      if (!course) {
        return Promise.reject({
          __mock_bypass__: {
            data: { detail: "Course not found (dev mock)" },
            status: 404,
            statusText: "Not Found",
            headers: {},
            config,
          }
        });
      }
      return Promise.reject({ __mock_bypass__: ok(course) });
    }

    const CONTENT_ACTIVITY_KEY = "__ax_course_activity__";
    const readActivityStore = (): Record<string, any> => {
      try {
        return JSON.parse(localStorage.getItem(CONTENT_ACTIVITY_KEY) || "{}");
      } catch {
        return {};
      }
    };
    const writeActivityStore = (obj: Record<string, any>) => {
      localStorage.setItem(CONTENT_ACTIVITY_KEY, JSON.stringify(obj));
    };

    function seedActivityIfMissing(courseId: number) {
      const store = readActivityStore();
      const key = String(courseId);

      if (!store[key]) {
        store[key] = {
          activity: {
            id: Number(`${courseId}00`),
            userId: 1,
            courseId,
            lastActivityDate: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
            predictedCancellation: Math.random() * 0.3,
            loggedAt: new Date().toISOString(),
          },
        };
        writeActivityStore(store);
      }

      return readActivityStore()[key];
    }

    if (url.match(/\/courses\/\d+\/content-activity$/) && method === "get") {
      const parts = url.split("/");
      const courseId = Number(parts[parts.length - 2]);

      const node = seedActivityIfMissing(courseId);

      return Promise.reject({
        __mock_bypass__: ok(node, 200),
      });
    }

    const WISHLIST_KEY = "__ax_wishlist__";
    const readWishlist = (): number[] => {
      try {
        const raw = localStorage.getItem(WISHLIST_KEY);
        return raw ? JSON.parse(raw) : [];
      } catch {
        return [];
      }
    };
    const writeWishlist = (ids: number[]) => {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
    };

    if (url.endsWith("/wishlist") && method === "get") {
      const ids = readWishlist();
      const items = ids.map((course_id) => ({ course_id }));
      return Promise.reject({ __mock_bypass__: ok(items, 200) });
    }

    if (url.endsWith("/wishlist") && method === "post") {
      const body = config.data ?? {};
      const courseId = Number(body.course_id);
      const ids = readWishlist();
      if (!ids.includes(courseId)) {
        ids.push(courseId);
        writeWishlist(ids);
      }
      return Promise.reject({ __mock_bypass__: ok({ status: "ok" }, 201) });
    }

    if (url.match(/\/wishlist\/\d+$/) && method === "delete") {
      const courseId = Number(url.split("/").pop());
      const ids = readWishlist().filter((id) => id !== courseId);
      writeWishlist(ids);
      return Promise.reject({ __mock_bypass__: ok({ status: "ok" }, 200) });
    }

    if (url.match(/\/wishlist\/\d+$/) && method === "get") {
      const courseId = Number(url.split("/").pop());
      const ids = readWishlist();
      const exists = ids.includes(courseId);
      return Promise.reject({ __mock_bypass__: ok({ exists }, 200) });
    }

    if (url.endsWith("/subscriptions/me") && method === "get") {
      return Promise.reject({ __mock_bypass__: ok({ status: "inactive" }) });
    }

    if (url.endsWith("/progress/me") && method === "get") {
      return Promise.reject({
        __mock_bypass__: ok({
          courseProgress: [
            { courseId: 101, title: "React Fundamentals", completedLessons: 5, totalLessons: 12, lastActive: new Date().toISOString() },
            { courseId: 102, title: "Django REST API", completedLessons: 2, totalLessons: 18, lastActive: new Date().toISOString() },
          ],
        }),
      });
    }

    if (url.endsWith("/notifications") && method === "get") {
      const now = Date.now();
      const randNew = Math.random() < 0.25;

      const baseNotifications = [
        { id: 1, title: "Test1", type: "reminder", message: "You haven’t watched any lessons in 'React Fundamentals' this week.", status: "test", createdAt: new Date(now - 30 * 60 * 1000).toISOString(), read: false },
        { id: 2, title: "Test2", type: "recommendation", message: "Based on your interests, try 'Celery & Redis — Background Tasks'.", status: "test", createdAt: new Date(now - 5 * 60 * 60 * 1000).toISOString(), read: false },
        { id: 3, title: "Test3", type: "subscription", message: "Your subscription is inactive. Subscribe to keep learning.", status: "test1", createdAt: new Date(now - 24 * 60 * 60 * 1000).toISOString(), read: true },
      ];

      const maybeNew = randNew
        ? [
          ...baseNotifications,
          { id: 4, type: "progress", message: "You completed 2 lessons today—keep it up!", createdAt: new Date(now - 5 * 60 * 1000).toISOString(), read: false },
        ]
        : baseNotifications;

      return Promise.reject({ __mock_bypass__: ok(maybeNew, 200) });
    }

    if (url.match(/\/notifications\/\d+\/read$/) && method === "post") {
      return Promise.reject({ __mock_bypass__: ok({ status: "ok" }, 200) });
    }

    if (url.endsWith("/notifications/read-all") && method === "post") {
      return Promise.reject({ __mock_bypass__: ok({ status: "ok" }, 200) });
    }

    return config;
  });

  http.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error && error.__mock_bypass__) {
        return Promise.resolve(error.__mock_bypass__);
      }
      return Promise.reject(error);
    }
  );
}
