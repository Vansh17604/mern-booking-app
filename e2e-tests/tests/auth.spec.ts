import { test, expect } from '@playwright/test';

const UI_URL ="http://localhost:5173/"

test('should not allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);
  
  //get the sign-in button
  await page.getByRole('link',{name: "Sign In"}).click();

  await expect(page.getByRole("heading", {name:"Sign In"})).toBeVisible();

  await page.locator("[name=email]").fill("vansh456patel@gmail.com");
  await page.locator("[name=password]").fill("Vansh@123");
  
  await page.getByRole("button",{name:"Login"}).click();

  await expect(page.getByText("Sign in Successful")).toBeVisible();

  await expect(page.getByRole("link",{name:"My Bookings"})).toBeVisible();
  await expect(page.getByRole("link",{name:"My Hotels"})).toBeVisible();
  await expect(page.getByRole("button",{name:"Sign Out"})).toBeVisible();
});


test("should allow all the user to Register",async({page})=>{
  const testEmail= `test_register_${Math.floor(Math.random()*9000)+1000}@test.com` 
  await page.goto(UI_URL);
  await page.getByRole('link',{name: "Sign In"}).click();
  await page.getByRole('link',{name: "Create an Account"}).click();
  await expect( page.getByRole('heading',{name:"Create Account"})).toBeVisible();
  await page.locator("[name=firstName]").fill("rame");
  await page.locator("[name=lastName]").fill("edition");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("123890");
  await page.locator("[name=confirmPassword]").fill("123890");
  await page.getByRole("button",{name:"Create Account"}).click();

 await expect(page.getByText("Registaion Success!")).toBeVisible();

 await expect(page.getByRole("link",{name:"My Bookings"})).toBeVisible();
 await expect(page.getByRole("link",{name:"My Hotels"})).toBeVisible();
 await expect(page.getByRole("button",{name:"Sign Out"})).toBeVisible();


});
