import { expect, type Page } from "@playwright/test";
import path from "node:path";

export type Role = "owner" | "teacher" | "mentor" | "student" | "parent";

/** Sign in through the real login screen. */
export async function signIn(page: Page, role: Role, institute = "patna_jee") {
  await page.goto("/login");
  await page.getByRole("radio", { name: new RegExp(`^${role}`, "i") }).check({ force: true });
  await page.getByLabel("Institute", { exact: true }).selectOption(institute);
  await page.getByTestId("login-submit").click();
  await expect(page).not.toHaveURL(/\/login/);
}

export const fixture = (name: string) => path.join(__dirname, "fixtures", name);

/** Mock-only: forget edits so every spec starts from the seeded state. */
export async function resetMock(page: Page) {
  await page.request.post("/api/mock/dev/reset");
}
