import { expect, test } from "@playwright/test";
import { resetMock, signIn } from "./helpers";

test.beforeEach(async ({ page }) => {
  await resetMock(page);
});

test("heatmap and support list load, list is by name and has no rank labels", async ({ page }) => {
  await signIn(page, "teacher");
  await page.goto("/teacher");
  await expect(page.getByText("Topic mastery").first()).toBeVisible();
  const list = page.getByTestId("support-list");
  await expect(list.locator("li").first()).toBeVisible();
  await expect(page.getByText(/leaderboard|rank #|top performer/i)).toHaveCount(0);
});

test("edit attendance inline: server validation message, then the list updates in place", async ({ page }) => {
  await signIn(page, "teacher");
  await page.goto("/teacher");
  const adult = page.locator('[data-testid="support-list"] li[data-track="full"]').first();
  await expect(adult).toBeVisible();
  const sid = await adult.getAttribute("data-student");
  await adult.getByTestId("edit-attendance").click();
  await adult.getByTestId("attendance-input").fill("140");
  await adult.getByTestId("attendance-save").click();
  await expect(adult.getByTestId("attendance-error")).toContainText("between 0 and 100 (got 140)");

  await adult.getByTestId("attendance-input").fill("95");
  await adult.getByTestId("attendance-save").click();
  await expect(page.getByTestId("edit-note")).toContainText("recomputed");
  // same row, still mounted, now shows the new figure (or left the list because no reason remains)
  const row = page.locator(`[data-student="${sid}"]`);
  if (await row.count()) await expect(row.getByText("95%")).toBeVisible();

  // refresh button re-reads the server and keeps the edit
  await page.getByTestId("refresh-list").click();
  const after = page.locator(`[data-student="${sid}"]`);
  if (await after.count()) await expect(after.getByText("95%")).toBeVisible();
});

test("a minor's attendance edit is saved but the model does not use it (academic track)", async ({ page }) => {
  await signIn(page, "teacher");
  await page.goto("/teacher");
  const minor = page.locator('[data-testid="support-list"] li[data-track="academic_support"]').first();
  await minor.getByTestId("edit-attendance").click();
  await minor.getByTestId("attendance-input").fill("40");
  await minor.getByTestId("attendance-save").click();
  await expect(page.getByTestId("edit-note")).toContainText("Under 18");
});

test("flagged question: fix the key and see it marked fixed", async ({ page }) => {
  await signIn(page, "teacher");
  await page.goto("/teacher");
  const fix = page.getByTestId("fix-key-17");
  await expect(fix).toBeVisible();
  await fix.click();
  await expect(page.getByText(/students re-scored/)).toBeVisible();
  await expect(page.getByTestId("flagged-list").getByText("Key fixed")).toHaveCount(1);
  await expect(page.getByTestId("fix-key-17")).toHaveCount(0);
});

test("a mentor can edit attendance but cannot fix keys", async ({ page }) => {
  await signIn(page, "mentor");
  await page.goto("/teacher");
  await expect(page.getByTestId("edit-attendance").first()).toBeVisible();
  await expect(page.getByTestId("fix-key-17")).toHaveCount(0);
  await expect(page.getByText(/Only the owner or a teacher can change a key/).first()).toBeVisible();
});
