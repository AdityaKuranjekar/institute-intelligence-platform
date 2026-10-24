import { expect, test } from "@playwright/test";
import { fixture, signIn } from "./helpers";

test("upload CSV: mapping preview, row errors, manual override, commit, jump to heatmap", async ({ page }) => {
  await signIn(page, "teacher");
  await page.goto("/capture");
  await page.getByTestId("ingest-file").setInputFiles(fixture("attendance_messy.csv"));

  // mapping preview with confidence
  const table = page.getByTestId("mapping-table");
  await expect(table).toBeVisible();
  const pctSelect = table.getByLabel(/Present %/);
  await expect(pctSelect).toHaveValue("attendance_pct");

  // row errors: 140 %, text, unknown roll number
  const errors = page.getByTestId("row-errors");
  await expect(errors).toContainText("between 0 and 100 (got 140)");
  await expect(errors).toContainText("No student with roll number PAT26-9999");
  await expect(errors).toContainText('"abc" is not a number');
  await expect(page.getByTestId("rejected-count")).toContainText("3");

  // manual override: ignoring the only attendance column blocks saving, mapping it back allows it
  await pctSelect.selectOption("");
  await expect(page.getByTestId("commit")).toBeDisabled();
  await expect(page.getByText(/Map at least one of/)).toBeVisible();
  await pctSelect.selectOption("attendance_pct");
  await expect(page.getByTestId("commit")).toBeEnabled();

  await page.getByTestId("commit").click();
  await expect(page.getByTestId("progress")).toBeVisible();
  await expect(page).toHaveURL(/\/teacher/, { timeout: 15_000 });
  await expect(page.getByText(/Saved 3 rows from attendance_messy.csv \(3 skipped\)/)).toBeVisible();
});

test("OMR photo: uncertain bubbles need one-tap fixes before confirm", async ({ page }) => {
  await signIn(page, "teacher");
  await page.goto("/capture");
  await page.getByRole("tab", { name: /OMR photo/ }).click();
  await page.getByTestId("omr-file").setInputFiles({ name: "sheet.jpg", mimeType: "image/jpeg", buffer: Buffer.alloc(60_000, 7) });
  const list = page.getByTestId("omr-uncertain");
  await expect(list).toBeVisible();
  const confirm = page.getByTestId("omr-confirm");
  await expect(confirm).toBeDisabled();
  const groups = list.getByRole("radiogroup");
  const n = await groups.count();
  expect(n).toBeGreaterThan(0);
  for (let i = 0; i < n; i++) await groups.nth(i).getByRole("radio", { name: "B" }).click();
  await expect(confirm).toBeEnabled();
  await confirm.click();
  await expect(page.getByText(/Sheet scored/)).toBeVisible();
  await expect(page).toHaveURL(/\/teacher/, { timeout: 15_000 });
  await expect(page.getByText(/OMR sheet sheet.jpg was scored and saved/)).toBeVisible();
});

test("OMR photo that is too small asks for a retake", async ({ page }) => {
  await signIn(page, "teacher");
  await page.goto("/capture");
  await page.getByRole("tab", { name: /OMR photo/ }).click();
  await page.getByTestId("omr-file").setInputFiles({ name: "tiny.jpg", mimeType: "image/jpeg", buffer: Buffer.alloc(2_000, 1) });
  await expect(page.getByText(/Please retake this photo/)).toBeVisible();
});

test("a student cannot open Capture; the server also refuses (403)", async ({ page }) => {
  await signIn(page, "student");
  await page.goto("/capture");
  await expect(page.getByText(/for the owner and teachers/)).toBeVisible();
  const status = await page.evaluate(async () => {
    const s = JSON.parse(localStorage.getItem("pragati.session") || "{}");
    const r = await fetch("/api/mock/ingest/attendance", { method: "POST", headers: { authorization: `Bearer ${s.token}` }, body: new FormData() });
    return r.status;
  });
  expect(status).toBe(403);
});
