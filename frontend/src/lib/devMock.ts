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
