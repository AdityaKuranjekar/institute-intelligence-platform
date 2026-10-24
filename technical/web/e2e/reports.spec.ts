import { expect, test } from "@playwright/test";
import { resetMock, signIn } from "./helpers";

test.beforeEach(async ({ page }) => {
  await resetMock(page);
});

test("parent generates a Hindi report: verifier ticks and template note", async ({ page }) => {
  await signIn(page, "parent");
  await page.goto("/parent/_");
  await page.getByRole("radio", { name: "हिन्दी" }).click();
  await page.getByTestId("make-report").click();
  const result = page.getByTestId("report-result");
  await expect(result).toBeVisible();
  await expect(page.getByTestId("verified-badge")).toContainText(/8 of 8 checks passed/);
  await expect(page.getByTestId("source-badge")).toContainText("Written from a template");
  await expect(page.getByTestId("report-body")).toContainText("प्रिय अभिभावक");
  await result.getByText("What was checked").click();
  await expect(page.getByTestId("check-list").locator("li")).toHaveCount(8);
});

test("asking for the local model while it is down falls back to the template and says so", async ({ page }) => {
  await signIn(page, "student");
  await page.goto("/student/_");
  await page.getByText("Try the local language model first").click();
  await page.getByTestId("make-report").click();
  await expect(page.getByTestId("fallback-note")).toContainText("template was used");
  await expect(page.getByTestId("report-body")).toContainText("Dear Parent");
});

test("a student or parent only ever receives their own record", async ({ page }) => {
  await signIn(page, "parent");
  const r = await page.evaluate(async () => {
    const s = JSON.parse(localStorage.getItem("pragati.session") || "{}");
    const h = { authorization: `Bearer ${s.token}` };
    const mine = await (await fetch(`/api/mock/patna_jee/student`, { headers: h })).json();
    const risk = await fetch(`/api/mock/patna_jee/risk`, { headers: h });
    const other = await fetch(`/api/mock/students/someone-else/reports`, { method: "POST", headers: { ...h, "content-type": "application/json" }, body: JSON.stringify({ language: "en" }) });
    return { n: mine.students.length, risk: risk.status, other: other.status };
  });
  expect(r).toEqual({ n: 1, risk: 403, other: 403 });
});
