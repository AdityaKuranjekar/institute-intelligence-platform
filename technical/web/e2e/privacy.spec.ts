import { expect, test } from "@playwright/test";
import { resetMock, signIn } from "./helpers";

test.beforeEach(async ({ page }) => {
  await resetMock(page);
});

test("owner switches to academic-only and sees the honest accuracy cost, then the list shrinks", async ({ page }) => {
  await signIn(page, "owner");
  await page.goto("/privacy");
  await expect(page.getByTestId("tier-table")).toContainText("0.812");
  await expect(page.getByTestId("tier-table")).toContainText("0.668");
  await page.getByText("Academic only (tests, no attendance or engagement)").click();
  await expect(page.getByTestId("tier-cost")).toContainText("honest cost");
  await page.getByTestId("apply-tier").click();
  await expect(page.getByTestId("tier-result")).toContainText(/went from \d+ to \d+/);
});

test("owner withdraws a consent: row shows processing halted", async ({ page }) => {
  await signIn(page, "owner");
  await page.goto("/privacy");
  const table = page.getByTestId("consent-table");
  await expect(table).toBeVisible();
  await table.getByTestId("withdraw").first().click();
  await page.getByTestId("confirm-withdraw").click();
  await expect(page.getByTestId("consent-msg")).toContainText("Processing halted");
  await expect(table.locator('tr[data-status="withdrawn"]')).toHaveCount(1);
});

test("a teacher can read the page but not change it (button off, server says 403)", async ({ page }) => {
  await signIn(page, "teacher");
  await page.goto("/privacy");
  await expect(page.getByTestId("consent-table")).toBeVisible();
  await expect(page.getByTestId("apply-tier")).toBeDisabled();
  await expect(page.getByTestId("withdraw")).toHaveCount(0);
  const status = await page.evaluate(async () => {
    const s = JSON.parse(localStorage.getItem("pragati.session") || "{}");
    const r = await fetch("/api/mock/settings/privacy-tier", { method: "PUT", headers: { authorization: `Bearer ${s.token}`, "content-type": "application/json" }, body: JSON.stringify({ tier: "academic_only" }) });
    return r.status;
  });
  expect(status).toBe(403);
});

test("an expired token (401) sends the user back to login", async ({ page }) => {
  await signIn(page, "teacher");
  await page.evaluate(() => {
    const s = JSON.parse(localStorage.getItem("pragati.session") || "{}");
    s.token = "mock.teacher.stale";
    localStorage.setItem("pragati.session", JSON.stringify(s));
  });
  await page.goto("/teacher");
  await expect(page).toHaveURL(/\/login\?expired=1/);
  await expect(page.getByText("Your session ended")).toBeVisible();
});
